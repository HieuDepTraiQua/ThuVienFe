import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { API_URL } from '../utils/const';

export const REVIEW_URL = API_URL + 'review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient
  ) { }
  
  getAllPaging(page: number, size: number): Observable<Review> {
    return this.http.get<Review>(`${REVIEW_URL}?page=${page}&size=${size}`);
  }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(REVIEW_URL, review);
  }

  update(review: Review, id: string): Observable<Review> {
    return this.http.put<Review>(`${REVIEW_URL}/${id}`, review);
  }
  
  delete(id: string): Observable<Review> {
    return this.http.delete<Review>(`${REVIEW_URL}/${id}`);
  }
}
