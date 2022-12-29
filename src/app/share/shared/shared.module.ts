import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/modules/table/table.component';
import { ColTableComponent } from 'src/app/modules/col/col.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertOutline, AlertFill } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ButtonCommonComponent } from './button-common/button-common.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizeTextPipe } from './pipe/capitalize-text.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TrimSpaceDirective } from './directive/trim-space.directive';
import { AutofocusDirective } from './directive/autofocus.directive';
import { OnlyNumberDirective } from './directive/only-number.directive';
import { StatusPipe } from './pipe/status.pipe';
import { StatusColorPipe } from './pipe/status-color.pipe';
import { InputCurrenyDirective } from './directive/currency-input.directive';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

const EXPORTS = [
  TableComponent,
  ColTableComponent,
  ButtonCommonComponent,
  CapitalizeTextPipe,
  TrimSpaceDirective,
  AutofocusDirective,
  OnlyNumberDirective,
  InputCurrenyDirective,
  StatusPipe
]

@NgModule({
  declarations: [...EXPORTS, StatusColorPipe ],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzLayoutModule,
    NzIconModule.forChild(icons),
    NzPaginationModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzGridModule

  ],
  exports: [...EXPORTS]
})
export class SharedModule { }
