import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';


interface LoginResponse { 
  token: string;  
  access?: string;
  jwt?: string; 
  data?: {
    token?: string;
    access?: string;
    jwt?: string;
  };
  result?: {
    token?: string;
    access?: string;
    jwt?: string;
  }; }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/users/login/`, payload).pipe(
      tap((res: LoginResponse) => {
        const tokenCandidate =
          res?.token ||
          res?.access ||
          res?.jwt ||
          res?.data?.token ||
          res?.data?.access ||
          res?.data?.jwt ||
          res?.result?.token ||
          res?.result?.access ||
          res?.result?.jwt ||
          null;

        if (tokenCandidate) {
          localStorage.setItem(this.tokenKey, tokenCandidate);
        }
      })
    );
  }

  register(payload: {
    first_name: string; 
    last_name: string; 
    email: string;
    phone_number: string; 
    password: string; 
    country_code: string;
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

