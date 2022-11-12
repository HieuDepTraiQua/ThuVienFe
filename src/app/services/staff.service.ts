import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/models/staff.model';
import { API_URL } from '../utils/const';

export const STAFF_URL = API_URL + 'staff';

@Injectable({
  providedIn: 'root'
})
export class SatffService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Staff> {
    return this.http.get<Staff>(STAFF_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<Staff> {
    return this.http.get<Staff>(`${STAFF_URL}/get?page=${page}&size=${size}`);
  }

  create(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(STAFF_URL + "/create", staff);
  }

  update(staff: Staff, id: string): Observable<Staff> {
    return this.http.put<Staff>(`${STAFF_URL}/update/${id}`, staff);
  }

  delete(id: string): Observable<Staff> {
    return this.http.delete<Staff>(`${STAFF_URL}/delete/${id}`);
  }
}
