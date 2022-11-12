import { SatffService } from './../../services/staff.service';
import { Staff } from './../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  formGroup!: FormGroup;
  staffs: Staff[] = [];
  selectedStaff!: Staff;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  constructor(
    private staffService: SatffService ,
    private fb: FormBuilder,
    private modal: NzModalService
  ) { 
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAllStaff();
  }
  getAllStaff(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.staffService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.totalPage = response.totalPage  * 10;
          this.staffs = response.data;
         this.staffs = this.staffs.map(staff => {
           return {
             ...staff,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: Staff): void {
    this.staffService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllStaff();
      });
  }
  
  showModal(data?: Staff): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedStaff = data;
      this.formGroup.patchValue({
        name: data.name,
        dob: data.dob,
        phoneNumber: data.phoneNumber,
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
    
    const staff: Staff = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.staffService.update(staff, this.selectedStaff.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllStaff();
      });
    } else {
      this.staffService.create(staff)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllStaff();
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Staff): void {
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
    this.getAllStaff();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllStaff();
  }
}
