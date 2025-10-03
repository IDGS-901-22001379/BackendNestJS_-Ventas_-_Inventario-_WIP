import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  // agrega los campos que tenga tu entidad
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private base = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(dto: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.base, dto);
  }

  update(id: number, dto: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.base}/${id}`, dto);
  }

  remove(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
