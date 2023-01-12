import { Staff } from './../../models/staff.model';
import { Book } from './../../models/book.model';
import { SatffService } from './../../services/staff.service';
import { BookService } from './../../services/book.service';
import { CardService } from './../../services/library_card.service';
import { LibraryCard } from './../../models/library_card.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BookRental } from 'src/app/models/book_rental.model';
import { BookRentalService } from 'src/app/services/book_rental.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-book-rental',
  templateUrl: './book-rental.component.html',
  styleUrls: ['./book-rental.component.scss']
})
export class BookRentalComponent implements OnInit {

  formGroup!: FormGroup;
  bookRentals: BookRental[] = [];
  cards: LibraryCard[] = [];
  books: Book[] = [];
  staffs: Staff[] = [];
  selectedBookRental!: BookRental;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  accountId ='';
  price: any;
  modalTitle='';
  amount=0;
  constructor(
    private bookRentalService: BookRentalService ,
    private cardService: CardService ,
    private bookService: BookService ,
    private staffService: SatffService ,
    private fb: FormBuilder,
    private modal: NzModalService,
    private tokenService: TokenStorageService,
  ) { 
    this.formGroup = this.fb.group({
      quantity: ['']
    })
    this.accountId = this.tokenService.getUserId();
  }

  ngOnInit(): void {
    this.getAllBookRental();
  }

  getAllBookRental(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.bookRentalService.getAllPaging(this.pageIndex-1, this.pageSize, this.accountId)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.bookRentals = response.data;
          this.getTotalPrice();
          this.totalPage = response.totalPage  * 10;
          this.amount = this.bookRentals.length;
          this.bookRentals = this.bookRentals.map(bookRental => {
           return {
             ...bookRental,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  getTotalPrice(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.bookRentalService.getTotalPrice(this.accountId)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.price = response.data;
          this.price = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: BookRental): void {
    this.bookRentalService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllBookRental();
      });
  }
  
  showModal(type: string, data?: BookRental): void {
    this.isVisible = true;
    if (type === 'update') {
      this.modalTitle = 'Cập nhật sách';
    }
    if (data) {
      this.isUpdate = true;
      this.selectedBookRental = data;
      this.formGroup.patchValue({
        quantity: data.quantity,
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
    
    const bookRental: BookRental = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.bookRentalService.update(bookRental, this.selectedBookRental.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllBookRental();
      });
    } else {
      this.bookRentalService.create(bookRental)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllBookRental();
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: BookRental): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa khỏi giỏ hàng sản phẩm này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  showPaymentConfirm(data: BookRental): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn thanh toán ' + data.quantity + ' quyển ' + data.nameBook,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllBookRental();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllBookRental();
  }

}
