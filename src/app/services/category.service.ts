import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { API_URL } from '../utils/const';

export const CATEGORY_URL = API_URL + 'category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category> {
    return this.http.get<Category>(CATEGORY_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<Category> {
    return this.http.get<Category>(`${CATEGORY_URL}/get?page=${page}&size=${size}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(CATEGORY_URL + "/create", category);
  }

  update(category: Category, id: string): Observable<Category> {
    return this.http.put<Category>(`${CATEGORY_URL}/update/${id}`, category);
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${CATEGORY_URL}/delete/${id}`);
  }
}
