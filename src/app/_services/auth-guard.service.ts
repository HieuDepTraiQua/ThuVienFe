import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private tokenService: TokenStorageService) {
   }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      // if (!this.tokenService.getToken()) {
      //   this.router.navigateByUrl('login');
      //   return false;
      // }
      return true;
  }
}
