import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      const isAuthEndpoint = req.url.includes('/users/login/') || req.url.includes('/users/sign-up/');

      const token = this.auth.getToken();
      const authReq = !isAuthEndpoint && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }): req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
      if (!isAuthEndpoint && error.status === 401) {
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  })
  );
  }
}