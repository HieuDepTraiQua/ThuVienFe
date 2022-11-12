import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [AuthLayoutComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzBadgeModule,
    NzAvatarModule,
    NzDropDownModule,
    RouterModule,
    NzModalModule,
    NzPopoverModule,
    ReactiveFormsModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NzDropDownModule
  ],
  exports: [AuthLayoutComponent, MainLayoutComponent],
})
export class LayoutModule { }
