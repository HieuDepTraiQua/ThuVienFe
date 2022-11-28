import { AuthorService } from './../../services/author.service';
import { Author } from 'src/app/models/author.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  formGroup!: FormGroup;
  authors: Author[] = [];
  selectedAuthor!: Author;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  constructor(
    private authorService: AuthorService ,
    private fb: FormBuilder,
    private modal: NzModalService,
    private toastrService: ToastrService
  ) { 
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAllAuthor();
  }

  getAllAuthor(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.authorService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.authors = response.data;
          this.totalPage = response.totalPage  * 10;
         this.authors = this.authors.map(author => {
           return {
             ...author,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: Author): void {
    this.authorService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllAuthor();
            this.toastrService.success("Xóa dữ liệu", "Thành công");
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
          
      });
  }
  
  showModal(data?: Author): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedAuthor = data;
      this.formGroup.patchValue({
        name: data.name,
        note: data.note,
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
    
    const author: Author = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.authorService.update(author, this.selectedAuthor.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllAuthor();
            this.toastrService.success("Cập nhật dữ liệu", "Thành công")
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
      });
    } else {
      this.authorService.create(author)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllAuthor();
            this.toastrService.success("Tạo mới dữ liệu", "Thành công")
          }
          else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Author): void {
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

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllAuthor();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllAuthor();
  }

  onRowClick(data: any): void {
    console.log(data, 'on click row');
  }

}


