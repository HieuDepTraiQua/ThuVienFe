import { Component } from '@angular/core';

@Component({
  selector: 'app-main-routes',
  template:
    '<app-main-layout><router-outlet></router-outlet></app-main-layout>',
})
export class MainRoutesComponent {
  constructor() {}
}
