import { AccountModule } from './pages/account/account.module';
import { Book } from './models/book.model';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layouts/layout.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthRoutesComponent } from './routes/auth.routes.component';
import { MainRoutesComponent } from './routes/main.routes.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: '',
    component: AuthRoutesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
  {
    path: '',
    component: MainRoutesComponent,
    children: [
      {
        path: 'author',
        loadChildren: () =>
          import('./pages/author/author.module').then(
            (m) => m.AuthorModule
          ),
          canActivate : [AuthGuardService]
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
          canActivate : [AuthGuardService]
      },
      {
        path: 'book',
        loadChildren: () =>
          import('./pages/book/book.module').then(
            (m) => m.BookModule
          ),
          canActivate : [AuthGuardService]
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.module').then(
            (m) => m.AccountModule
          ),
          canActivate : [AuthGuardService]
      },
      {
        path: 'rental',
        loadChildren: () =>
          import('./pages/book-rental/book-rental.module').then(
            (m) => m.BookRentalModule
          ),
          canActivate : [AuthGuardService]
      },
    ],
  },
  
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    LayoutModule,
    ],
  exports: [RouterModule],
  declarations: [AuthRoutesComponent,
    MainRoutesComponent,]
})
export class AppRoutingModule { }
