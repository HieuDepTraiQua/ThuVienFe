import { Category } from './../../models/category.model';
import { Author } from './../../models/author.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  formGroup!: FormGroup;
  books: Book[] = [];
  authors: Author[] = [];
  categories: Category[] = [];
  selectedBook!: Book;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  accountRole = '';
  isAdmin = false;

  selectedFiles?: any;
  previews: string = "";
  
  constructor(
    private bookService: BookService ,
    private authorService: AuthorService ,
    private categoryService: CategoryService ,
    private fb: FormBuilder,
    private modal: NzModalService,
    private toastrService: ToastrService,
    private tokenService: TokenStorageService,
  ) { 
    this.formGroup = this.fb.group({
      nameBook: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      publishYear: ['', [Validators.required]],
      image: [null],
    })
    this.accountRole = this.tokenService.getUser();
    if (this.accountRole === 'admin'){
      this.isAdmin = true;
    }

  }

  ngOnInit(): void {
    this.getAllBook();
    this.getAllAuthor();
    this.getAllCategory();
  }

  getAllBook(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.bookService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.books = response.data;
          this.totalPage = response.totalPage  * 10;
          this.books = this.books.map(book => {
           return {
             ...book,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: Book): void {
    this.bookService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllBook();
            this.toastrService.success("Xóa dữ liệu", "Thành công");
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
      });
  }
  
  showModal(data?: Book): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedBook = data;
      this.formGroup.patchValue({
        nameBook: data.nameBook,
        authorId: data.authorId,
        categoryId: data.categoryId,
        publishYear: data.publishYear,
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
    
    const book: Book = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.bookService.update(book, this.selectedBook.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllBook();
            this.toastrService.success("Cập nhật dữ liệu", "Thành công");
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
          
      });
    } else {
      this.bookService.create(book)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllBook();
            this.toastrService.success("Tạo mới dữ liệu", "Thành công");
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
          
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Book): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: `<b style="color: red;">${data.nameBook}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllBook();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllBook();
  }

  getAllCategory(): void {
    this.categoryService.getAll()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.categories = response.data;
        }else{
          console.log('Error!');
        }
      });
  }

  onCategory(): void {
    this.getAllCategory();
  }

  getAllAuthor(): void {
    this.authorService.getAll()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.authors = response.data;
        }else{
          console.log('Error!');
        }
      });
  }

  onAuthor(): void {
    this.getAllAuthor();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onFileSelected(e: any): void {
    this.selectedFiles = e.target.files;

    if (this.selectedFiles![0].type.startsWith("image")) {    
      if (this.selectedFiles && this.selectedFiles[0]) {
        this.bookService.upload(this.selectedFiles[0], this.selectedFiles[0].name).subscribe((res: any) => {
          if (res && res.body && res.body.data) {
            this.selectedBook.image = res.body.data;
          }
        });
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.previews = (e.target.result);
        };
  
        reader.readAsDataURL(this.selectedFiles[0]);
      }
    } else {
      this.toastrService.error("File tải lên phải là ảnh!")
    }
  }
}
