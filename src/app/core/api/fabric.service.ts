import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FabricService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = 'http://localhost:3000/fabric';

  getAllFabrics(): Observable<any[]> {
    return this._http
      .get<any[]>(this._baseUrl)
      .pipe(map((fabrics) => fabrics.filter((f) => f.isActive)));
  }
}
