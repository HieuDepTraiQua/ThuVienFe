import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SharedModule } from 'src/app/share/shared/shared.module';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSpinModule,
    NzButtonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NzDatePickerModule
  ]
})
export class AuthModule { }
