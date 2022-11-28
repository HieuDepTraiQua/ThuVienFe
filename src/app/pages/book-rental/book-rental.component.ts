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
  constructor(
    private bookRentalService: BookRentalService ,
    private cardService: CardService ,
    private bookService: BookService ,
    private staffService: SatffService ,
    private fb: FormBuilder,
    private modal: NzModalService
  ) { 
    this.formGroup = this.fb.group({
      libraryCardId: ['', [Validators.required]],
      staffId: ['', [Validators.required]],
      bookId: ['', [Validators.required]],
      borrowedDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAllBookRental();
    // this.getAllBook();
    this.getAllCard();
    this.getAllStaff();
  }

  getAllBookRental(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.bookRentalService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.bookRentals = response.data;
          this.totalPage = response.totalPage  * 10;
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

  onDelete(data: BookRental): void {
    this.bookRentalService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllBookRental();
      });
  }
  
  showModal(data?: BookRental): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedBookRental = data;
      this.formGroup.patchValue({
        libraryCardId: data.libraryCardId,
        staffId: data.staffId,
        bookId: data.bookId,
        borrowedDate: data.borrowedDate,
        returnDate: data.returnDate
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
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
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

  getAllStaff(): void {
    this.staffService.getAll()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.staffs = response.data;
        }else{
          console.log('Error!');
        }
      });
  }

  onStaff(): void {
    this.getAllStaff();
  }

  // getAllBook(): void {
  //   this.bookService.getAll()
  //     .pipe(finalize(() => this.isLoading$.next(false)))
  //     .subscribe((response: any) => {
  //       if(response && response.success){
  //         this.books = response.data;
  //       }else{
  //         console.log('Error!');
  //       }
  //     });
  // }

  // onBook(): void {
  //   this.getAllBook();
  // }

}
