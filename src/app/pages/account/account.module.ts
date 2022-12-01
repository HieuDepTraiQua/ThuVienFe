import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from 'src/app/share/shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
]

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzModalModule,
    NzGridModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDatePickerModule,
    SharedModule,
    FormsModule
  ]
})
export class AccountModule { }
