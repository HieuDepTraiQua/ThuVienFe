import { Role } from './../models/role.model';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { API_URL } from '../utils/const';

export const ACCOUNT_URL = API_URL + 'account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPaging(page: number, size: number): Observable<Account> {
    return this.http.get<Account>(`${ACCOUNT_URL}?page=${page}&size=${size}`);
  }

  create(Account: Account): Observable<Account> {
    return this.http.post<Account>(ACCOUNT_URL, Account);
  }

  update(Account: Account, id: string): Observable<Account> {
    return this.http.put<Account>(`${ACCOUNT_URL}/${id}`, Account);
  }
  
  delete(id: string): Observable<Account> {
    return this.http.delete<Account>(`${ACCOUNT_URL}/${id}`);
  }

  getAllRole(): Observable<Role> {
    return this.http.get<Role>(ACCOUNT_URL + "/getrole");
  }
}
