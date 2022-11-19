import { Category } from './../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  formGroup!: FormGroup;
  categories: Category[] = [];
  selectedCategory!: Category;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  constructor(
    private categoryService: CategoryService ,
    private fb: FormBuilder,
    private modal: NzModalService,
    private toastrService: ToastrService
  ) { 
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]]
     
    })
  }


  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void{
    this.isLoading$.next(true);
    this.categoryService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.categories = response.data;
          this.totalPage = response.totalPage  * 10;
          console.log(this.totalPage, 'total page');
          
          this.categories = this.categories.map(category => {
            return {
              ...category,
              checked: false
            }
          });
        }else{
          console.log('Error!');
        }
      })
  }

  onDelete(data: Category): void {
    this.categoryService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any) => {
          if (response && response.success === true){
            this.getAllCategory();
            this.toastrService.success("Xóa dữ liệu", "Thành công")
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
      });
  }
  
  showModal(data?: Category): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedCategory = data;
      this.formGroup.patchValue({
        title: data.title
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
    
    const category: Category = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.categoryService.update(category, this.selectedCategory.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any)  => {
          if (response && response.success === true){
            this.getAllCategory();
            this.toastrService.success("Cập nhật dữ liệu", "Thành công")
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }
      });
    } else {
      this.categoryService.create(category)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe((response: any)  => {
          if (response && response.success === true){
            this.toastrService.success("Tạo mới dữ liệu", "Thành công")
            this.getAllCategory();
          } else {
            this.toastrService.error("Vui lòng thử lại", "Đã có lỗi xảy ra");
          }

        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Category): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: `<b style="color: red;">${data.title}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllCategory();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllCategory();
  }

  onRowClick(data: any): void {
    console.log(data, 'on click row');
  }

}
