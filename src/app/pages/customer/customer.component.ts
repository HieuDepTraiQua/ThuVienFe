
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/library_card.service';
import { LibraryCard } from './../../models/library_card.model';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  formGroup!: FormGroup;
  customers: Customer[] = [];
  cards: LibraryCard[] = [];
  selectedCustomer!: Customer;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  cardDropdown: any[] = [];
  customer: Customer = new Customer();
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  constructor(
    private customerService: CustomerService ,
    private cardService: CardService ,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private modal: NzModalService
  ) { 
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      libraryCardId: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAllCustomer();
    this.getAllCard();
  }

  getAllCustomer(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.customerService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.customers = response.data;
          this.totalPage = response.totalPage  * 10;
          this.customers = this.customers.map(customer => {
           return {
             ...customer,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: Customer): void {
    this.customerService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCustomer();
      });
  }
  
  showModal(data?: Customer): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedCustomer = data;
      this.formGroup.patchValue({
        name: data.name,
        address: data.address,
        libraryCardId: data.libraryCardId,
      })
    } else {
      this.isUpdate = false;
      this.formGroup.reset();
    }
  }

  handleOk(): void {

    if (this.formGroup.invalid) {
      console.log(this.formGroup, 'form invalid');
      return;
    }
    
    const customer: Customer = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.customerService.update(customer, this.selectedCustomer.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCustomer();
      });
    } else {
      this.customerService.create(customer)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCustomer();
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Customer): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: `<b style="color: red;">${data.name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  getAllCard(): void {
    this.cardService.getAll()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.cards = response.data;
        }else{
          console.log('Error!');
        }
      });
  }

  onCard(): void {
    this.getAllCard();
  }

   onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllCustomer();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllCustomer();
  }

  onRowClick(data: any): void {
    console.log(data, 'on click row');
  }

}
