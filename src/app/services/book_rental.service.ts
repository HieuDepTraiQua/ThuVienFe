import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRental } from 'src/app/models/book_rental.model';
import { API_URL } from '../utils/const';

export const RENTAL_URL = API_URL + 'rental';

@Injectable({
  providedIn: 'root'
})
export class BookRentalService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<BookRental> {
    return this.http.get<BookRental>(RENTAL_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<BookRental> {
    return this.http.get<BookRental>(`${RENTAL_URL}/get?page=${page}&size=${size}`);
  }

  create(rental: BookRental): Observable<BookRental> {
    return this.http.post<BookRental>(RENTAL_URL + "/create", rental);
  }

  update(rental: BookRental, id: string): Observable<BookRental> {
    return this.http.put<BookRental>(`${RENTAL_URL}/update/${id}`, rental);
  }

  delete(id: string): Observable<BookRental> {
    return this.http.delete<BookRental>(`${RENTAL_URL}/delete/${id}`);
  }
}
