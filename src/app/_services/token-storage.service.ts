import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ID_KEY = 'auth-user-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private router: Router) { }

  signOut(): void {
    window.localStorage.clear();
    this.router.navigateByUrl("login");
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserId(userId: any): void {
    window.localStorage.removeItem(USER_ID_KEY);
    window.localStorage.setItem(USER_ID_KEY, JSON.stringify(userId));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserId(): any {
    const userId = window.localStorage.getItem(USER_ID_KEY);
    if (userId) {
      return JSON.parse(userId);
    }
    return {};
  }
}