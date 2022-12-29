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

  getAllPaging(page: number, size: number, userId: string): Observable<BookRental> {
    return this.http.get<BookRental>(`${RENTAL_URL}?page=${page}&size=${size}&id=${userId}`);
  }
  getTotalPrice(userId: string): Observable<BookRental> {
    return this.http.get<BookRental>(`${RENTAL_URL}/price?id=${userId}`);
  }

  create(rental: BookRental): Observable<BookRental> {
    return this.http.post<BookRental>(RENTAL_URL, rental);
  }

  update(rental: BookRental, id: string): Observable<BookRental> {
    return this.http.put<BookRental>(`${RENTAL_URL}/${id}`, rental);
  }

  delete(id: string): Observable<BookRental> {
    return this.http.delete<BookRental>(`${RENTAL_URL}/${id}`);
  }
}
