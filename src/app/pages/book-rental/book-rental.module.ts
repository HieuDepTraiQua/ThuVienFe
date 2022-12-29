import { BookRental } from 'src/app/models/book_rental.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRentalComponent } from './book-rental.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from 'src/app/share/shared/shared.module';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

export const routes: Routes = [
  {
    path: '',
    component: BookRentalComponent,
  },
]

@NgModule({
  declarations: [
    BookRentalComponent
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
    FormsModule,
    NzInputNumberModule
  ]
})
export class BookRentalModule { }
