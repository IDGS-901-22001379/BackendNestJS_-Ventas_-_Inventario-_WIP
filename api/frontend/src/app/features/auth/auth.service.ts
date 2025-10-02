import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isBrowser } from '../../shared/utils/platform';

export interface LoginDto { email: string; password: string; }
export interface LoginResponse { access_token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(isBrowser && !!localStorage.getItem('token'));
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(dto: LoginDto) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, dto)
      .pipe(
        tap(res => {
          if (isBrowser) {
            localStorage.setItem('token', res.access_token);
          }
          this.loggedIn$.next(true);
        })
      );
  }

  logout() {
    if (isBrowser) localStorage.removeItem('token');
    this.loggedIn$.next(false);
  }

  get token(): string | null {
    return isBrowser ? localStorage.getItem('token') : null;
  }
}
