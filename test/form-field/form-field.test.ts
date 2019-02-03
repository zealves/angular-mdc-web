import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent } from '../testing/dispatch-events';

import {
  MdcFormField,
  MdcFormFieldModule,
  MdcCheckboxModule,
  MdcRadioModule,
  MdcSwitchModule,
  MdcTextFieldModule,
  MdcFormFieldVariant
} from '@angular-mdc/web';

describe('MdcFormField', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcFormFieldModule,
        MdcCheckboxModule,
        MdcRadioModule,
        MdcSwitchModule,
        MdcTextFieldModule
      ],
      declarations: [
        SimpleTest,
        FormFieldWithTextField
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcFormField;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcFormField));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should contain mdc-form-field--align-end class', () => {
      testComponent.alignEnd = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).toContain('mdc-form-field--align-end');
    });

    it('#should contain ngx-mdc-form-field--fluid class', () => {
      testComponent.fluid = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).toContain('ngx-mdc-form-field--fluid');
    });

    it('#should activate ripple on input', fakeAsync(() => {
      dispatchFakeEvent(testInstance.label, 'click');
      fixture.detectChanges();
      flush();
    }));
  });

  describe('FormFieldWithTextField', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcFormField;
    let testComponent: FormFieldWithTextField;

    beforeEach(() => {
      fixture = TestBed.createComponent(FormFieldWithTextField);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcFormField));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should contain ngx-form-field-text-field class', () => {
      expect(testDebugElement.nativeElement.classList).toContain('ngx-form-field-text-field');
    });

    it('#should not have a label set', () => {
      expect(testInstance.label).toBeUndefined();
    });

    it('#should set helper-text persistent to true', () => {
      testComponent.persistent = true;
      fixture.detectChanges();
      expect(testInstance.assistiveElements.toArray()[0].persistent).toBe(true);
    });

    it('#should set variant to outlined', () => {
      testComponent.variant = 'outlined';
      fixture.detectChanges();
      expect(testInstance.variant).toBe('outlined');
    });
  });
});

@Component({
  template: `
  <mdc-form-field [alignEnd]="alignEnd" [fluid]="fluid">
    <mdc-checkbox></mdc-checkbox>
    <label>My label</label>
  </mdc-form-field>
  <mdc-form-field>
    <mdc-radio></mdc-radio>
    <label>My label</label>
  </mdc-form-field>
  <mdc-form-field>
    <mdc-switch></mdc-switch>
    <label>My label</label>
  </mdc-form-field>
  <mdc-form-field>
    <mdc-switch></mdc-switch>
  </mdc-form-field>
  <mdc-form-field>
    <mdc-switch></mdc-switch>
    <span>not a label</span>
  </mdc-form-field>
  <mdc-form-field></mdc-form-field>`,
})
class SimpleTest {
  alignEnd: boolean = false;
  fluid: boolean;
}

@Component({
  template: `<mdc-form-field [variant]="variant">
  <mdc-text-field label="First name" outlined required></mdc-text-field>
  <mdc-helper-text [persistent]="persistent" validation>*Required</mdc-helper-text>
</mdc-form-field>`
})
class FormFieldWithTextField {
  variant: MdcFormFieldVariant;
  persistent: boolean;
}
