import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
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

  // getAll(): Observable<Book> {
  //   return this.http.get<Book>(BOOK_URL + "/getall");
  // }

  getAllPaging(page: number, size: number): Observable<Book> {
    return this.http.get<Book>(`${BOOK_URL}?page=${page}&size=${size}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(BOOK_URL, book);
  }

  update(book: Book, id: string): Observable<Book> {
    return this.http.put<Book>(`${BOOK_URL}/${id}`, book);
  }

  delete(id: string): Observable<Book> {
    return this.http.delete<Book>(`${BOOK_URL}/${id}`);
  }

  // upload(file: File): Observable<Book> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //   //   reportProgress: true,
  //   //   responseType: 'json'
  //   // });

  //   return this.http.post<Book>(`${BOOK_URL}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  // }
  // getFiles(): Observable<any> {
  //   return this.http.get(`${BOOK_URL}/files`);
  // }


  upload(file: File, fileName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const req = new HttpRequest('POST', `${BOOK_URL}/uploads`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // uploadImage2(file: File): Observable<Book> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post<Book>(BOOK_URL + '/upload', formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   })
  // }
}
