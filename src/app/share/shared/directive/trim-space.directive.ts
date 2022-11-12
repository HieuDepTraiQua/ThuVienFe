import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { convertVietnamese } from '../common-function/common-function';

@Directive({
  selector: '[trimSpace]'
})
export class TrimSpaceDirective {

  constructor(public el: ElementRef, private control : NgControl) { }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const keyCode = event.which ? event.which : event.keyCode;
    if (keyCode == 32) {
        event.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp() {
    let value = this.el.nativeElement.value;
    value = convertVietnamese(value);
    if (this.control && this.control.valueAccessor && value) {
      this.control.valueAccessor.writeValue(value);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let value = this.el.nativeElement.value;
    value = convertVietnamese(value);
    if (this.control && this.control.valueAccessor && value) {
      this.control.valueAccessor.writeValue(value);
    }
  }
}
