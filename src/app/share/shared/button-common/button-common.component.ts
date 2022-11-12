import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-common',
  templateUrl: './button-common.component.html',
  styleUrls: ['./button-common.component.scss']
})
export class ButtonCommonComponent implements OnInit {
  @Input() okButton = true;
  @Input() buttonWidth = '100px';
  @Input() buttonHeight = '30px';

  @Output() clickButton = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(): void {
    this.clickButton.emit();
  }

}
