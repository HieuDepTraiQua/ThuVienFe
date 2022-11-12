import { LibraryCard } from './../models/library_card.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../utils/const';

export const CARD_URL = API_URL + 'card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<LibraryCard> {
    return this.http.get<LibraryCard>(CARD_URL + "/getall");
  }

  getAllPaging(page: number, size: number): Observable<LibraryCard> {
    return this.http.get<LibraryCard>(`${CARD_URL}/get?page=${page}&size=${size}`);
  }

  create(card: LibraryCard): Observable<LibraryCard> {
    return this.http.post<LibraryCard>(CARD_URL + "/create", card);
  }

  update(card: LibraryCard, id: string): Observable<LibraryCard> {
    return this.http.put<LibraryCard>(`${CARD_URL}/update/${id}`, card);
  }

  delete(id: string): Observable<LibraryCard> {
    return this.http.delete<LibraryCard>(`${CARD_URL}/delete/${id}`);
  }
}
