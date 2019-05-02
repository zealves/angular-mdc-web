import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { MDCComponent } from '@angular-mdc/web/base';
import { MdcFloatingLabel } from '@angular-mdc/web/floating-label';

import { MDCNotchedOutlineFoundation, MDCNotchedOutlineAdapter } from '@material/notched-outline';

@Component({
  moduleId: module.id,
  selector: '[mdcNotchedOutline], mdc-notched-outline',
  exportAs: 'mdcNotchedOutline',
  host: {
    'class': 'mdc-notched-outline',
    '[class.mdc-notched-outline--upgraded]': 'label',
    '[class.mdc-notched-outline--no-label]': '!label'
  },
  template: `
  <div class="mdc-notched-outline__leading"></div>
  <div #notch class="mdc-notched-outline__notch">
    <label mdcFloatingLabel [for]="for">{{label}}</label>
  </div>
  <div class="mdc-notched-outline__trailing"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcNotchedOutline extends MDCComponent<MDCNotchedOutlineFoundation> {
  @Input() label?: string;
  @Input() for?: string;
  @ViewChild('notch') _notchElement!: ElementRef<HTMLElement>;
  @ViewChild(MdcFloatingLabel) floatingLabel!: MdcFloatingLabel;

  getDefaultFoundation() {
    const adapter: MDCNotchedOutlineAdapter = {
      addClass: (className: string) => this.elementRef.nativeElement.classList.add(className),
      removeClass: (className: string) =>
        this.elementRef.nativeElement.classList.remove(className),
      setNotchWidthProperty: (width: number) =>
        this._notchElement.nativeElement.style.setProperty('width', `${width}px`),
      removeNotchWidthProperty: () => this._notchElement.nativeElement.style.removeProperty('width')
    };
    return new MDCNotchedOutlineFoundation(adapter);
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  /** Updates classes and styles to open the notch to the specified width. */
  notch(notchWidth: number): void {
    this._foundation.notch(notchWidth);
  }

  /** Updates classes and styles to close the notch. */
  closeNotch(): void {
    this._foundation.closeNotch();
  }
}
