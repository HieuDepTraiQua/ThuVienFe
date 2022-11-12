import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryCardComponent } from './library-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from 'src/app/share/shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: LibraryCardComponent,
  },
]

@NgModule({
  declarations: [
    LibraryCardComponent
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
export class LibraryCardModule { }
