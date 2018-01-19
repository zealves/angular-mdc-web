import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean, isBrowser, EventRegistry } from '@angular-mdc/web/common';

import { MdcTextFieldHelperText } from './helper-text';
import { MdcTextFieldBottomLine } from './bottom-line';
import { MdcTextFieldLeadingIcon, MdcTextFieldTrailingIcon } from './icon';
import { MdcTextFieldLabel } from './label';

import { MDCTextFieldAdapter } from '@material/textfield/adapter';
import { MDCTextFieldFoundation } from '@material/textfield';

// Invalid input type. Using one of these will throw an error.
const MD_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

let nextUniqueId = 0;

export const MDC_TEXTFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextField),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-text-field',
  template: `
  <input #input class="mdc-text-field__input"
    [type]="type"
    [id]="id"
    [tabindex]="tabIndex"
    [disabled]="disabled"
    [placeholder]="placeholder"
    [attr.maxlength]="maxlength"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)" />
    <mdc-text-field-label [attr.for]="id" *ngIf="!placeholder">{{label}}</mdc-text-field-label>
    <mdc-text-field-bottom-line></mdc-text-field-bottom-line>
  `,
  providers: [
    MDC_TEXTFIELD_CONTROL_VALUE_ACCESSOR,
    EventRegistry,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTextField implements AfterViewInit, OnDestroy, ControlValueAccessor {
  private _type = 'text';
  private _disabled: boolean = false;
  private _required: boolean = false;
  private _focused: boolean = false;
  private _helperText: MdcTextFieldHelperText;

  @Input() id: string = `mdc-input-${nextUniqueId++}`;
  @Input() fullwidth: boolean = false;
  @Input() dense: boolean = false;
  @Input() label: string;
  @Input() maxlength: number;
  @Input() placeholder: string = '';
  @Input() tabIndex: number = 0;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Output() iconAction = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();
  @HostBinding('class.mdc-text-field') isHostClass = true;
  @ViewChild('input') inputText: ElementRef;
  @ViewChild(MdcTextFieldLabel) inputLabel: MdcTextFieldLabel;
  @ViewChild(MdcTextFieldBottomLine) bottomLine: MdcTextFieldBottomLine;
  @ContentChild(MdcTextFieldLeadingIcon) leadingIcon: MdcTextFieldLeadingIcon;
  @ContentChild(MdcTextFieldTrailingIcon) trailingIcon: MdcTextFieldTrailingIcon;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._foundation.setDisabled(value);
      this._disabled = value;
    }
  }
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = toBoolean(value);
  }
  @Input()
  get focused(): boolean { return this._focused; }
  set focused(value: boolean) {
    this._focused = toBoolean(value);
  }
  @Input()
  get helperText(): MdcTextFieldHelperText { return this._helperText; }
  set helperText(helperText: MdcTextFieldHelperText) {
    this._helperText = helperText;
  }
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    if (!this.isTextarea()) {
      this._renderer.setProperty(this.inputText, 'type', this._type);
    }
  }

  /** The input element's value. */
  @Input()
  get value(): string { return this.inputText.nativeElement.value; }
  set value(value: string) {
    if (value !== this.value) {
      this.inputText.nativeElement.value = value;
    }
  }

  get valid(): boolean {
    return this.inputText.nativeElement.validity.valid;
  }

  /** Whether the control is empty. */
  get empty(): boolean {
    return !this.elementRef.nativeElement.value && !this.isBadInput();
  }

  @HostBinding('class.mdc-text-field--dense') get classDense(): string {
    return this.dense ? 'mdc-text-field--dense' : '';
  }
  @HostBinding('class.mdc-text-field--fullwidth') get classFullwidth(): string {
    this.placeholder = this.fullwidth ? this.label : '';
    return this.fullwidth ? 'mdc-text-field--fullwidth' : '';
  }
  @HostBinding('class.mdc-text-field--focused') get classFocused(): string {
    return this._focused ? 'mdc-text-field--focused' : '';
  }

  private _mdcAdapter: MDCTextFieldAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    hasClass: (className: string) => {
      return this.elementRef.nativeElement.classList.contains(className);
    },
    registerTextFieldInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.listen(evtType, handler, this.elementRef.nativeElement);
    },
    deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) => {
      this._registry.unlisten(evtType, handler);
    },
    registerInputInteractionHandler: (evtType, handler) =>
      this._registry.listen(evtType, handler, this.inputText.nativeElement),
    deregisterInputInteractionHandler: (evtType, handler) => this._registry.unlisten(evtType, handler),
    registerBottomLineEventHandler: (evtType: string, handler: EventListener) => {
      if (!this.bottomLine) { return; }

      this._registry.listen(evtType, handler, this.bottomLine.elementRef.nativeElement);
    },
    deregisterBottomLineEventHandler: (evtType: string, handler: EventListener) => {
      if (!this.bottomLine) { return; }

      this._registry.unlisten(evtType, handler);
    },
    isFocused: () => this._focused,
    isRtl: () => this.direction === 'rtl',
    getNativeInput: () => this.inputText.nativeElement,
  };

  /** Returns a map of all subcomponents to subfoundations. */
  private _getFoundationMap() {
    return {
      bottomLine: this.bottomLine ? this.bottomLine.foundation : undefined,
      helperText: this._helperText ? this.helperText.foundation : undefined,
      icon: this.leadingIcon ? this.leadingIcon.foundation
        : this.trailingIcon ? this.trailingIcon.foundation : undefined,
      label: this.inputLabel ? this.inputLabel.foundation : undefined,
    };
  }

  private _foundation: {
    init: () => {},
    destroy: () => {},
    isDisabled: () => boolean,
    setDisabled: (disabled: boolean) => {},
    setValid: (isValid: boolean) => {},
    setValue: (value: string) => {},
    activateFocus: () => {},
    deactivateFocus: () => {},
    isValid: () => boolean,
    setHelperTextContent: (content: string) => {},
  };

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => { };

  /** View -> model callback called when text field has been touched */
  _onTouched = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    this._foundation
      = new MDCTextFieldFoundation(this._mdcAdapter, this._getFoundationMap());
    this._foundation.init();

    this.updateIconState();
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.bottomLine) {
      this.bottomLine.foundation.destroy();
    }
    if (this.helperText) {
      this.helperText.foundation.destroy();
    }
    if (this.leadingIcon) {
      this.leadingIcon.foundation.destroy();
    }
    if (this.trailingIcon) {
      this.trailingIcon.foundation.destroy();
    }
    if (this.inputLabel) {
      this.inputLabel.foundation.destroy();
    }

    this._foundation.destroy();
  }

  writeValue(value: string): void {
    this.value = value == null ? '' : value;
    if (this.inputLabel) {
      this.value.length > 0 ? this.inputLabel.mdcAdapter.addClass('mdc-text-field__label--float-above')
        : this.inputLabel.mdcAdapter.removeClass('mdc-text-field__label--float-above');
    }
    this.change.emit(value);
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  onInput(value: string): void {
    this.value = value;
    this._onChange(value);
    this.change.emit(value);
    this._changeDetectorRef.markForCheck();
  }

  onBlur(): void {
    this._focused = false;
    this._onTouched();

    if (this.bottomLine) {
      this.bottomLine.deactivate();
    }
    this.setValid();
    this.blur.emit(this.value);
    this._changeDetectorRef.markForCheck();
  }

  isDisabled(): boolean {
    return this._foundation.isDisabled();
  }

  isBadInput(): boolean {
    const validity = (this.elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  focus(): void {
    if (!this._disabled) {
      this._focused = true;
      this.inputText.nativeElement.focus();
    }
  }

  setValid(value?: boolean): void {
    this._foundation.setValid(value ? value : this.valid);
  }

  isTextarea(): boolean {
    const nativeElement = this.elementRef.nativeElement;
    const nodeName = isBrowser ? nativeElement.nodeName : nativeElement.name;

    return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
  }

  selectAll(): void {
    this.inputText.nativeElement.select();
  }

  /** Deactives the Text Field's focus state. */
  deactivateFocus(): void {
    this._foundation.deactivateFocus();
  }

  /** Activates the text field focus state. */
  activateFocus(): void {
    this._foundation.activateFocus();
  }

  /** Sets the content of the helper text. */
  setHelperTextContent(content: string): void {
    this._foundation.setHelperTextContent(content);
  }

  updateIconState(): void {
    if (this.isTextarea()) { return; }

    if (this.leadingIcon) {
      this._renderer.addClass(this._getHostElement(), 'mdc-text-field--with-leading-icon');
    } else if (this.trailingIcon) {
      this._renderer.addClass(this._getHostElement(), 'mdc-text-field--with-trailing-icon');
    }
  }

  _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private _validateType() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw Error(`Input type "${this._type}" is not supported.`);
    }
  }
}
