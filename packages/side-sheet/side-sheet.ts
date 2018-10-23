import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subscription, fromEvent, Subject } from 'rxjs';
import { startWith, takeUntil, filter } from 'rxjs/operators';

import { Platform, toBoolean } from '@angular-mdc/web/common';

import createFocusTrap from 'focus-trap';

import { createFocusTrapInstance } from '@material/side-sheet/util';
import {
  MDCDismissibleSideSheetFoundation,
  MDCModalSideSheetFoundation
} from '@material/side-sheet/index';

export type MdcSideSheetType = 'dismissible' | 'modal';

@Directive({
  selector: 'mdc-side-sheet-content, [mdcSideSheetContent]',
  host: { 'class': 'mdc-side-sheet' }
})
export class MdcSideSheetContent { }

@Directive({
  selector: 'mdc-side-sheet-app-content, [mdcSideSheetAppContent]',
  host: { 'class': 'mdc-side-sheet-app-content' }
})
export class MdcSideSheetAppContent { }

@Component({
  moduleId: module.id,
  selector: 'mdc-side-sheet',
  exportAs: 'mdcSideSheet',
  host: {
    'role': 'navigation',
    'class': 'mdc-side-sheet',
    '[class.mdc-side-sheet--dismissible]': 'dismissible',
    '[class.mdc-side-sheet--modal]': 'modal'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSideSheet implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _initialized: boolean;
  private _previousFocus: Element | null;
  private _scrimElement: Element | null;

  private _focusTrapFactory: any;
  private _focusTrap: any;

  @Input()
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    this._open = toBoolean(value);
    if (this._open) {
      this._foundation.open();
    } else {
      this._foundation.close();
    }
    this._changeDetectorRef.markForCheck();
  }
  private _open: boolean;

  @Input()
  get dismissible(): boolean { return this._dismissible; }
  set dismissible(value: boolean) {
    this._dismissible = toBoolean(value);
  }
  private _dismissible: boolean;

  @Input()
  get modal(): boolean { return this._modal; }
  set modal(value: boolean) {
    this._modal = toBoolean(value);
  }
  private _modal: boolean;

  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  private _scrimSubscription: Subscription | null;

  createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      elementHasClass: (element: Element, className: string) => element.classList.contains(className),
      saveFocus: () => this._previousFocus = this._platform.isBrowser ? document.activeElement! : null,
      restoreFocus: () => {
        if (!this._platform.isBrowser) { return; }

        const previousFocus = this._previousFocus && (<any>this._previousFocus).focus;
        if (this._getHostElement().contains(document.activeElement!) && previousFocus) {
          (<any>this._previousFocus).focus();
        }
      },
      focusActiveNavigationItem: () => {
        if (!this._platform.isBrowser) { return; }
      },
      notifyClose: () => this.closed.emit(),
      notifyOpen: () => this.opened.emit(),
      trapFocus: () => {
        if (this._focusTrap) {
          this._focusTrap.activate();
        }
      },
      releaseFocus: () => {
        if (this._focusTrap) {
          this._focusTrap.deactivate();
        }
      }
    };
  }

  private _foundation: {
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean,
    handleKeydown(evt: KeyboardEvent): void,
    handleTransitionEnd(evt: TransitionEvent): void
  };

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    if (!this._initialized) {
      this._initFoundation();
    }
  }

  ngOnDestroy(): void {
    this._unloadListeners();

    if (this._foundation && this._platform.isBrowser) {
      this._foundation.destroy();
    }
  }

  private _loadListeners(): void {
    if (this.modal && this._platform.isBrowser) {
      this._focusTrapFactory = createFocusTrap;

      this._scrimElement = document.createElement('div');
      this._scrimElement.classList.add('mdc-side-sheet-scrim');
      this._getHostElement().insertAdjacentElement('afterend', this._scrimElement);

      this._ngZone.runOutsideAngular(() =>
        this._scrimSubscription = fromEvent<MouseEvent>(this._scrimElement!, 'click')
          .subscribe(() => this._ngZone.run(() => this.open = false)));

      this._focusTrapFactory = createFocusTrapInstance(this._getHostElement(), this._focusTrapFactory);
    } else if (this._scrimElement) {
      if (this._scrimSubscription) {
        this._scrimSubscription.unsubscribe();
      }
      this._scrimElement.remove();
    }

    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleKeydown(evt))));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend')
        .pipe(takeUntil(this._destroy), filter((e: TransitionEvent) =>
          e.target === this._getHostElement()))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  private _unloadListeners(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._scrimSubscription) {
      this._scrimSubscription.unsubscribe();
    }
  }

  private _initFoundation(): void {
    if (this._initialized) { return; }

    this._initialized = true;

    if (this.modal) {
      this._foundation = new MDCModalSideSheetFoundation(this.createAdapter());
    } else {
      this._foundation = new MDCDismissibleSideSheetFoundation(this.createAdapter());
    }

    this._loadListeners();
    this._changeDetectorRef.markForCheck();
  }

  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
