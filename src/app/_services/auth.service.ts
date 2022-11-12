import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../utils/const';
import { ThaiPhuDangKy } from '../models/dangkythaiphu.model';

const AUTH_API = API_URL + "auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(thaiPhuDangKy: ThaiPhuDangKy): Observable<any> {
    return this.http.post(AUTH_API + '/thaiphudangky', thaiPhuDangKy);
  }
}