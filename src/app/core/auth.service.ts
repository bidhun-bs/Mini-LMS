import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, tap } from 'rxjs';


interface LoginResponse { token: string; }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/users/login/`, payload).pipe(
      tap(res => {
        if (res?.token) localStorage.setItem(this.tokenKey, res.token);
      })
    );
  }

  register(payload: {
    first_name: string; last_name: string; email: string;
    phone_number: string; password: string; country_code: string;
  }) {
    return this.http.post(`${this.base}/users/sign-up/`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
