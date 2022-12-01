import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  formGroup!: FormGroup;
  accounts: Account[] = [];
  selectedAccount!: Account;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  accountRole = '';
  isAdmin = false;
  dataOfRole: any[] = [];

  selectedFiles?: any;
  previews: any;

  get phoneControl() {
    return this.formGroup.controls.phoneNumber;
  }

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private toastrService: ToastrService,
    private tokenService: TokenStorageService
  ) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      password: [],
      phoneNumber: [null, [Validators.required, Validators.pattern("^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")]],
      address: [null],
      roleId: [null],
    });
    this.accountRole = this.tokenService.getUser();
    if (this.accountRole === 'admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllRole();
  }

  getAllData(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.accountService
      .getAllPaging(this.pageIndex - 1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.accounts = response.data;
          this.totalPage = response.totalPage * 10;
        } else {
          console.log('Xảy ra lỗi');
        }
      });
  }

  onDelete(data: Account): void {
    this.accountService
      .delete(data.id)
      .pipe(finalize(() => (this.isVisible = false)))
      .subscribe((response: any) => {
        if (response && response.success === true) {
          this.getAllData();
          this.toastrService.success('Xóa dữ liệu', 'Thành công');
        } else {
          this.toastrService.error('Vui lòng thử lại', 'Đã có lỗi xảy ra');
        }
      });
  }

  showModal(data?: Account): void {
    this.isVisible = true;
    if (data) {
      this.isUpdate = true;
      this.selectedAccount = data;
      this.formGroup.patchValue({
        username: data.username,
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        address: data.address,
        roleId: data.roleId,
      });
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

    const account: Account = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.accountService
        .update(account, this.selectedAccount.id)
        .pipe(finalize(() => (this.isVisible = false)))
        .subscribe((response: any) => {
          if (response && response.success === true) {
            this.getAllData();
            this.toastrService.success('Cập nhật dữ liệu', 'Thành công');
          } else {
            this.toastrService.error('Vui lòng thử lại', 'Đã có lỗi xảy ra');
          }
        });
    } else {
      this.accountService
        .create(account)
        .pipe(finalize(() => (this.isVisible = false)))
        .subscribe((response: any) => {
          if (response && response.success === true) {
            this.getAllData();
            this.toastrService.success('Tạo mới dữ liệu', 'Thành công');
          } else {
            this.toastrService.error('Vui lòng thử lại', 'Đã có lỗi xảy ra');
          }
        });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: Account): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: `<b style="color: red;">${data.username}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllData();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllData();
  }

  getAllRole(): void {
    this.accountService.getAllRole()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((response: any) => {
        if(response && response.success){
          this.dataOfRole = response.data;
        }else{
          console.log('Error!');
        }
      });
  }

  getInvalidPattern(control: string): boolean {
    if (
      (this.formGroup.get(control)?.touched ||
        this.formGroup.get(control)?.dirty) &&
      this.formGroup.get(control)?.hasError('pattern')
    ) {
      return true;
    }
    return false;
  }
}
