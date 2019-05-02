import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { merge, Observable, Subscription, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MDCComponent } from '@angular-mdc/web/base';
import { toBoolean, Platform } from '@angular-mdc/web/common';
import { MdcTabScroller, MdcTabScrollerAlignment } from '@angular-mdc/web/tab-scroller';
import { MdcTab, MdcTabInteractedEvent, MDC_TAB_BAR_PARENT_COMPONENT } from '@angular-mdc/web/tab';

import { MDCTabBarFoundation, MDCTabBarAdapter } from '@material/tab-bar';

export class MdcTabActivatedEvent {
  constructor(
    public source: MdcTabBar,
    public index: number,
    public tab: MdcTab) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcTabBar], mdc-tab-bar',
  exportAs: 'mdcTabBar',
  host: {
    'role': 'tablist',
    'class': 'mdc-tab-bar',
    '(keydown)': '_onKeydown($event)'
  },
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MDC_TAB_BAR_PARENT_COMPONENT, useExisting: MdcTabBar }]
})
export class MdcTabBar extends MDCComponent<MDCTabBarFoundation> implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get fade(): boolean { return this._fade; }
  set fade(value: boolean) {
    this._fade = toBoolean(value);
    this._syncTabs();
  }
  private _fade: boolean = false;

  @Input()
  get stacked(): boolean { return this._stacked; }
  set stacked(value: boolean) {
    this._stacked = toBoolean(value);
    this._syncTabs();
  }
  private _stacked: boolean = false;

  @Input()
  get fixed(): boolean { return this._fixed; }
  set fixed(value: boolean) {
    this._fixed = toBoolean(value);
    this._syncTabs();
  }
  private _fixed: boolean = false;

  @Input()
  get align(): MdcTabScrollerAlignment | null { return this._align; }
  set align(value: MdcTabScrollerAlignment | null) {
    this._align = value || 'start';
    this.tabScroller.align = this.align;
  }
  private _align: MdcTabScrollerAlignment | null = null;

  @Input()
  get iconIndicator(): string | null { return this._iconIndicator; }
  set iconIndicator(value: string | null) {
    this._iconIndicator = value;
    this._syncTabs();
  }
  private _iconIndicator: string | null = null;

  @Input()
  get useAutomaticActivation(): boolean { return this._useAutomaticActivation; }
  set useAutomaticActivation(value: boolean) {
    this._useAutomaticActivation = toBoolean(value);
    this._foundation.setUseAutomaticActivation(this._useAutomaticActivation);
  }
  private _useAutomaticActivation: boolean = true;

  @Input()
  get activeTabIndex(): number { return this._activeTabIndex; }
  set activeTabIndex(value: number) {
    if (this.activeTabIndex !== value) {
      this._activeTabIndex = value;
      this.activateTab(this.activeTabIndex);
    }
  }
  private _activeTabIndex: number = 0;

  @Input()
  get focusOnActivate(): boolean { return this._focusOnActivate; }
  set focusOnActivate(value: boolean) {
    this._focusOnActivate = toBoolean(value);
    this._syncTabs();
  }
  private _focusOnActivate: boolean = true;

  @Output() readonly activated: EventEmitter<MdcTabActivatedEvent> =
    new EventEmitter<MdcTabActivatedEvent>();

  @ContentChild(MdcTabScroller) tabScroller!: MdcTabScroller;
  @ContentChildren(MdcTab, { descendants: true }) tabs!: QueryList<MdcTab>;

  /** Subscription to changes in tabs. */
  private _changeSubscription: Subscription | null = null;

  /** Subscription to interaction events in tabs. */
  private _tabInteractionSubscription: Subscription | null = null;

  /** Combined stream of all of the tab interaction events. */
  get tabInteractions(): Observable<MdcTabInteractedEvent> {
    return merge(...this.tabs.map(tab => tab.interacted));
  }

  getDefaultFoundation() {
    const adapter: MDCTabBarAdapter = {
      scrollTo: (scrollX: number) => this.tabScroller.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement: number) => this.tabScroller.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller.getScrollContentWidth(),
      getOffsetWidth: () => this._getHostElement().offsetWidth,
      isRTL: () => this._platform.isBrowser ?
        window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl' : false,
      setActiveTab: (index: number) => this.activateTab(index),
      activateTabAtIndex: (index: number, clientRect?: ClientRect) => {
        if (this._indexIsInRange(index)) {
          this.tabs.toArray()[index].activate(clientRect);
        }
      },
      deactivateTabAtIndex: (index: number) => {
        if (this._indexIsInRange(index)) {
          this.tabs.toArray()[index].deactivate();
        }
      },
      focusTabAtIndex: (index: number) => this.tabs.toArray()[index].focus(),
      getTabIndicatorClientRectAtIndex: (previousActiveIndex: number) => {
        if (!this._platform.isBrowser) { return { height: 0, width: 0, bottom: 0, top: 0, left: 0, right: 0 }; }
        if (!this._indexIsInRange(previousActiveIndex)) {
          previousActiveIndex = this.activeTabIndex;
        }
        return this.tabs.toArray()[previousActiveIndex].computeIndicatorClientRect();
      },
      getTabDimensionsAtIndex: (index: number) => this.tabs.toArray()[index].computeDimensions(),
      getPreviousActiveTabIndex: () => this.tabs.toArray().findIndex((_) => _.active),
      getFocusedTabIndex: () =>
        this._platform.isBrowser ? this.tabs.toArray().findIndex(tab =>
          tab.elementRef.nativeElement === document.activeElement!) : -1,
      getIndexOfTabById: (id: string) => this.tabs.toArray().findIndex(tab => id === tab.id),
      getTabListLength: () => this.tabs.length,
      notifyTabActivated: (index: number) =>
        this.activated.emit({ source: this, index: index, tab: this.tabs.toArray()[index] })
    };
    return new MDCTabBarFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) {

    super(elementRef);
  }

  ngAfterContentInit(): void {
    this._foundation.init();

    // When the list changes, re-subscribe
    this._changeSubscription = this.tabs.changes.pipe(startWith(null)).subscribe(() => {
      Promise.resolve().then(() => {
        if (this.tabs.length) {
          this._syncTabs();
          this.activateTab(this.activeTabIndex);
          this._resetTabSubscriptions();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }

    this._dropSubscriptions();
  }

  private _syncTabs(): void {
    if (!this.tabs) { return; }

    this.tabs.forEach(tab => {
      tab.stacked = this._stacked;
      tab.fixed = this._fixed;
      tab.tabIndicator.fade = this._fade;
      tab.tabIndicator.icon = this._iconIndicator;
      tab.focusOnActivate = this._focusOnActivate;
    });
  }

  private _resetTabSubscriptions(): void {
    this._dropSubscriptions();
    this._listenToTabInteraction();
  }

  private _dropSubscriptions(): void {
    if (this._tabInteractionSubscription) {
      this._tabInteractionSubscription.unsubscribe();
      this._tabInteractionSubscription = null;
    }
  }

  /** Listens to interaction events on each tab. */
  private _listenToTabInteraction(): void {
    this._tabInteractionSubscription = this.tabInteractions.subscribe(event => {
      const previousTab = this.getActiveTab();
      if (previousTab) {
        previousTab.tabIndicator.active = false;
      }

      event.detail.tab.tabIndicator.active = true;
      this._foundation.handleTabInteraction(event);
    });
  }

  /** Activates the tab at the given index */
  activateTab(index: number): void {
    if (!this.tabs) { return; }

    this.activeTabIndex = index;

    if (this._platform.isBrowser) {
      this._foundation.activateTab(index);
    }
    this._changeDetectorRef.markForCheck();
  }

  /** Scrolls the tab at the given index into view */
  scrollIntoView(index: number): void {
    this._foundation.scrollIntoView(index);
  }

  getActiveTabIndex(): number {
    return this.tabs.toArray().findIndex((_) => _.active);
  }

  getActiveTab(): MdcTab | undefined {
    return this.tabs.toArray().find((_) => _.active);
  }

  /** Returns an index for given tab */
  getTabIndex(tab: MdcTab): number {
    return this.tabs.toArray().indexOf(tab);
  }

  /** Disable or enable the tab at the given index */
  disableTab(index: number, disabled: boolean): void {
    if (!this.tabs) { return; }

    this.tabs.toArray()[index].disabled = toBoolean(disabled);
  }

  _onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeyDown(evt);
  }

  private _indexIsInRange(index: number): boolean {
    return index >= 0 && index < this.tabs.length;
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
