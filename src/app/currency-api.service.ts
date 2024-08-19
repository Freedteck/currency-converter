import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/';
  private apiKey = '6fd3756e9ad9f5ae9a8f31c4';

  constructor(private http: HttpClient) {}

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${this.apiKey}/pair/${from}/${to}/${amount}`
    );
  }
}
