
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { errorInterceptor } from './_helper/error.interceptor';

import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';


// Import what you need. RECOMMENDED. ✔️
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { AuthGuardService } from './_services/auth-guard.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastrModule } from 'ngx-toastr';
import {NzResultModule} from "ng-zorro-antd/result"
import { NzButtonModule } from 'ng-zorro-antd/button';


const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    AppRoutingModule,
    NgApexchartsModule,
    NzResultModule,
    NzButtonModule,
    
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true 
    }), // ToastrModule added
  ],
  providers: [
          authInterceptorProviders,
          errorInterceptor,
          AuthGuardService,
          { provide: NZ_I18N, useValue: en_US },
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
