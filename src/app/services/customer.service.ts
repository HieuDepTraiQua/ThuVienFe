import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { API_URL } from '../utils/const';

export const CUSTOMER_URL = API_URL + 'customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Customer> {
    return this.http.get<Customer>(CUSTOMER_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<Customer> {
    return this.http.get<Customer>(`${CUSTOMER_URL}/get?page=${page}&size=${size}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(CUSTOMER_URL + "/create", customer);
  }

  update(customer: Customer, id: string): Observable<Customer> {
    return this.http.put<Customer>(`${CUSTOMER_URL}/update/${id}`, customer);
  }

  delete(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${CUSTOMER_URL}/delete/${id}`);
  }
}
