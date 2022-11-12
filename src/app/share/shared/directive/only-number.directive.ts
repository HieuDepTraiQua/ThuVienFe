import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { convertVietnamese, removeText } from '../common-function/common-function';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(public el: ElementRef, private control : NgControl) { }

  arrarKey = [46, 8, 9, 27, 13, 110, 190];

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const keyCode = e.which ? e.which : e.keyCode;
    if (this.arrarKey.includes(keyCode) ||
      // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((keyCode == 65 || keyCode == 86 || keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (keyCode >= 35 && keyCode <= 40)) {
      // let it happen, don't do anything
      return;
    }
    if ((e.shiftKey || (keyCode < 48 || keyCode > 57)) && (keyCode < 96 || keyCode > 105)) {
      e.preventDefault();
    }
  }


  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (event && event.clipboardData) {
      let data = event.clipboardData.getData('text');
      let newValue = data.replace(/[^0-9.\.]+/g, '');
  
      setTimeout(() => {
        this.control.control?.setValue(newValue);
      }, 100);
    }
  }
}