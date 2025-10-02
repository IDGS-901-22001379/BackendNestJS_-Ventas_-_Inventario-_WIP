import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private base = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  list(page = 1, pageSize = 10, search = ''): Observable<Page<User>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (search) params = params.set('search', search);
    return this.http.get<Page<User>>(this.base, { params });
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.base}/me`);
  }
}
