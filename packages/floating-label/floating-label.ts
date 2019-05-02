import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MDCComponent } from '@angular-mdc/web/base';
import { cssClasses } from '@material/floating-label/constants';
import { MDCFloatingLabelFoundation, MDCFloatingLabelAdapter } from '@material/floating-label';

@Directive({
  selector: 'label[mdcFloatingLabel], mdc-floating-label',
  exportAs: 'mdcFloatingLabel',
  host: {
    'class': 'mdc-floating-label',
    '[for]': 'for'
  }
})
export class MdcFloatingLabel extends MDCComponent<MDCFloatingLabelFoundation>
  implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input() for?: string;

  getDefaultFoundation() {
    const adapter: MDCFloatingLabelAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      getWidth: () => this._getHostElement().scrollWidth,
      registerInteractionHandler: () => { },
      deregisterInteractionHandler: () => { }
    };
    return new MDCFloatingLabelFoundation(adapter);
  }

  constructor(
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) {

    super(elementRef);
  }

  ngAfterContentInit(): void {
    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  /** Returns the width of the label element. */
  getWidth(): number {
    return this._foundation.getWidth();
  }

  /** Styles the label to produce the label shake for errors. */
  shake(shouldShake: boolean): void {
    this._foundation.shake(shouldShake);
  }

  /** Styles the label to float or dock. */
  float(shouldFloat: boolean): void {
    this._foundation.float(shouldFloat);
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<AnimationEvent>(this._getHostElement(), 'animationend')
        .pipe(takeUntil(this._destroy), filter((e: AnimationEvent) =>
          e.target === this._getHostElement()))
        .subscribe(() => this._ngZone.run(() => this._getHostElement().classList.remove(cssClasses.LABEL_SHAKE))));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
