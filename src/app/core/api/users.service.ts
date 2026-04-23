import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserProfile } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiUrl = 'http://localhost:3000/users';
  private http = inject(HttpClient);

  getProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('pardo_token');
    if (!token) {
      return of();
    }
    const decode: any = jwtDecode(token);
    const userId = decode.id;
    return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`);
  }
}
