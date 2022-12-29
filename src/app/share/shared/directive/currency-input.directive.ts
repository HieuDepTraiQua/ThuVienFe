import { AfterViewInit, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputCurreny]'
})
export class InputCurrenyDirective implements AfterViewInit {

  constructor(public el: ElementRef, private control: NgControl) { }


  ngAfterViewInit(): void {
    let value: string = this.el.nativeElement.value as string;
    if (value && value.includes(",")) {
      value = value.replace(/\,/g, "")
    } 
    this.control.valueAccessor?.writeValue(this.numberWithCommas(value));
  }

  @HostListener("keyup", ["$event.target.value"])
  onKeyup() {
    let value: string = this.el.nativeElement.value as string;
    if (value && value.includes(",")) {
      value = value.replace(/\,/g, "")
    }
    this.control.valueAccessor?.writeValue(this.numberWithCommas(value));
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}