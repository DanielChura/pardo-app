import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bed } from '../models/ecommerce.models';

@Injectable({ providedIn: 'root' })
export class BedService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = `http://localhost:3000/products`;

  getAllBeds() {
    return this._http.get<Bed[]>(this._baseUrl);
  }

  getBedById(id: string) {
    return this._http.get<Bed>(`${this._baseUrl}/${id}`);
  }
}