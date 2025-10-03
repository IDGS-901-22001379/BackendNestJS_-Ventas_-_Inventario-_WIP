import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isBrowser } from '../../shared/utils/platform';
import { decodeJwt } from '../../shared/utils/jwt';

export type Role = 'admin' | 'user';

export interface AuthUser {
  id: number;
  email: string;
  roles: Role[];
}

export interface LoginDto { email: string; password: string; }
export interface RegisterDto { email: string; password: string; name?: string; }
export interface AuthResponse { access_token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<AuthUser | null>(this.readUserFromStorage());
  userChanges$ = this.user$.asObservable();

  constructor(private http: HttpClient) {}

  private readUserFromStorage(): AuthUser | null {
    if (!isBrowser) return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = decodeJwt<any>(token);
    if (!payload) return null;
    // Ajusta los nombres de claims si tu JWT usa otros: sub, email, roles, etc.
    return {
      id: Number(payload.sub ?? payload.id),
      email: payload.email,
      roles: (payload.roles ?? payload.role ?? []) as Role[],
    };
  }

  get token(): string | null {
    return isBrowser ? localStorage.getItem('token') : null;
  }

  get currentUser(): AuthUser | null {
    return this.user$.value;
  }

  hasRole(role: Role): boolean {
    return !!this.currentUser?.roles?.includes(role);
  }

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, dto)
      .pipe(
        tap(res => {
          if (isBrowser) localStorage.setItem('token', res.access_token);
          this.user$.next(this.readUserFromStorage());
        })
      );
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, dto)
      .pipe(
        tap(res => {
          if (isBrowser) localStorage.setItem('token', res.access_token);
          this.user$.next(this.readUserFromStorage());
        })
      );
  }

  logout() {
    if (isBrowser) localStorage.removeItem('token');
    this.user$.next(null);
  }
}
