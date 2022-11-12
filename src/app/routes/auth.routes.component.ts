import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-routes',
  template:
    '<app-auth-layout><router-outlet></router-outlet></app-auth-layout>',
})
export class AuthRoutesComponent {
  constructor() {}
}