import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wood } from '../models/ecommerce.models';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WoodService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = 'http://localhost:3000/wood';

  getAllWoods(): Observable<Wood[]> {
    return this._http
      .get<Wood[]>(this._baseUrl)
      .pipe(map((woods) => woods.filter((w) => w.isActive)));
  }
}
