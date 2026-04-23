import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/orders';
  private http = inject(HttpClient);

  getOrder(): Observable<Order[]> {
    const token = localStorage.getItem('pardo_token');
    if (!token) {
      return of([]);
    }
    const decode: any = jwtDecode(token);
    const userId = decode.id;
    const httpParams = new HttpParams().set('userId', userId);
    return this.http.get<Order[]>(this.apiUrl, { params: httpParams });
  }
}
