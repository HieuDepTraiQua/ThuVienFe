import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { API_URL } from '../utils/const';

export const AUTHOR_URL = API_URL + 'author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Author> {
    return this.http.get<Author>(AUTHOR_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<Author> {
    return this.http.get<Author>(`${AUTHOR_URL}/get?page=${page}&size=${size}`);
  }

  create(author: Author): Observable<Author> {
    return this.http.post<Author>(AUTHOR_URL + "/create", author);
  }

  update(author: Author, id: string): Observable<Author> {
    return this.http.put<Author>(`${AUTHOR_URL}/update/${id}`, author);
  }

  delete(id: string): Observable<Author> {
    return this.http.delete<Author>(`${AUTHOR_URL}/delete/${id}`);
  }
}
