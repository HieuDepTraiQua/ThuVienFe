import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { API_URL } from '../utils/const';

export const BOOK_URL = API_URL + 'book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Book> {
    return this.http.get<Book>(BOOK_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<Book> {
    return this.http.get<Book>(`${BOOK_URL}/get?page=${page}&size=${size}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(BOOK_URL + "/create", book);
  }

  update(book: Book, id: string): Observable<Book> {
    return this.http.put<Book>(`${BOOK_URL}/update/${id}`, book);
  }

  delete(id: string): Observable<Book> {
    return this.http.delete<Book>(`${BOOK_URL}/delete/${id}`);
  }

  uploadImage(file: File): Observable<Book> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Book>(BOOK_URL + '/upload', formData);
  }

  uploadImage2(file: File): Observable<Book> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Book>(BOOK_URL + '/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }
}
