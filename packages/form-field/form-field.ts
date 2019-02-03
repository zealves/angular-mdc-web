import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MdcHelperText } from './helper-text';

/** All possible variants for mdc-form-field. */
export type MdcFormFieldVariant = 'fullwidth' | 'outlined' | undefined;

/**
 * Represents the default options for mdc-form-field that can be configured
 * using an `MDC_FORM_FIELD_DEFAULT_OPTIONS` injection token.
 */
export interface MdcFormFieldDefaultOptions {
  variant?: MdcFormFieldVariant;
  disabled?: boolean;
}

/**
 * Injection token that can be used to configure the default options for all
 * mdc-form-field usage within an app.
 */
export const MDC_FORM_FIELD_DEFAULT_OPTIONS =
  new InjectionToken<MdcFormFieldDefaultOptions>('MDC_FORM_FIELD_DEFAULT_OPTIONS');

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  host: {
    '[class.ngx-mdc-form-field--fluid]': 'fluid',
    '[class.mdc-form-field--align-end]': 'alignEnd'
  },
  template: `
  <ng-content></ng-content>
  <ng-content select="[mdcHelperText, mdc-helper-text]"></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements AfterContentInit, OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  public label?: HTMLElement;

  @Input()
  get variant(): MdcFormFieldVariant { return this._variant; }
  set variant(value: MdcFormFieldVariant) {
    if (value !== this._variant) {
      this._variant = value || (this._defaults && this._defaults.variant) || undefined;
    }
  }
  private _variant?: MdcFormFieldVariant;

  @Input()
  get fluid(): boolean { return this._fluid; }
  set fluid(value: boolean) {
    this._fluid = toBoolean(value);
  }
  private _fluid: boolean = false;

  @Input()
  get alignEnd(): boolean { return this._alignEnd; }
  set alignEnd(value: boolean) {
    this._alignEnd = toBoolean(value);
  }
  private _alignEnd: boolean = false;

  @ContentChild(MdcFormFieldControl) _control!: MdcFormFieldControl<any>;
  @ContentChildren(MdcHelperText, { descendants: true }) assistiveElements!: QueryList<MdcHelperText>;

  constructor(
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MDC_FORM_FIELD_DEFAULT_OPTIONS) private _defaults: MdcFormFieldDefaultOptions) {

    this.variant = (_defaults && _defaults.variant) ? _defaults.variant : undefined;
  }

  ngOnInit(): void {
    if (this._control) {
      const control = this._control.elementRef.nativeElement;

      if (control.nextElementSibling && control.nextElementSibling.tagName === 'LABEL') {
        this.label = control.nextElementSibling;
        this.label!.setAttribute('for', this._control.inputId || '');
        this._loadListeners();
      }
    }
  }

  ngAfterContentInit(): void {
    // When assistive elements change, initialize foundation
    this.assistiveElements.changes.pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => {
        (this.assistiveElements).forEach(helperText => {
          this._initHelperTextFoundation(helperText);
        });
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _initHelperTextFoundation(helperText: MdcHelperText): void {
    const control = this._control;

    if (control && control.controlType) {
      control.helperText = helperText;
    }
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.label!, 'click').pipe(takeUntil(this._destroyed))
        .subscribe(() => this._ngZone.run(() => {
          this._control.ripple!.activateRipple();

          if (typeof requestAnimationFrame !== 'undefined') {
            requestAnimationFrame(() => this._control.ripple!.deactivateRipple());
          }
        })));
  }
}
