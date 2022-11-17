import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roles: string[] = [];
  loginForm: FormGroup;
  checked = false;
  isSpinning = false;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checked: [false]
    })
   }

   ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    if (this.loginForm.get('username')?.hasError('required')) {
      this.toastr.error("Tên đăng nhập không được để trống", "Đăng nhập");
      return;
    } else if (this.loginForm.get('password')?.hasError('required')) {
      this.toastr.error("Mật khẩu không được để trống", "Đăng nhập");
      return;
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      this.toastr.error("Mật khẩu tối thiểu 6 ký tự", "Đăng nhập");
      return;
    }
    const { username, password } = this.loginForm.getRawValue();
    this.isSpinning = true;
    this.authService.login(username, password).
    pipe(finalize(() => this.isSpinning = false))
    .subscribe(
      response => {
        const token = response.data.accessToken;
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(username);
        this.roles = this.tokenStorage.getUser().roles;
        this.navigateToHome();
      },
      err => {
        this.toastr.error('Username hoặc mật khẩu không chính xác', 'Đăng nhập');
      }
    );
  }

  navigateToHome(): void {
    this.router.navigateByUrl('book');
  }

}
