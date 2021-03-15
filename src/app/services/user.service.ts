import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { LoginForm } from '../interfaces/loginForm.interface';

declare const gapi: any;

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  postUser(formData: RegisterForm) {
    return this.http.post(`${url}/users`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${url}/login`, formData).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogleUser(token) {
    return this.http.post(`${url}/login/google`, {token}).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '974969220945-envfj7kjg7vdt2jjc1kemd9hj0d3ngfm.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }
}
