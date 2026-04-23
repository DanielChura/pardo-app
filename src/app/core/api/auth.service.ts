import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/auth';

  // Signal para saber si el usuario está logueado en toda la app
  currentUser = signal<any>(null);

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('pardo_token', res.token);
        this.currentUser.set(res);
      }),
    );
  }

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('pardo_token');
    this.currentUser.set(null);
  }

  getUserId(): string | null {
    const token = localStorage.getItem('pardo_token');
    if (!token) return null;

    const decode: any = jwtDecode(token);
    return decode.id;
  }
}
