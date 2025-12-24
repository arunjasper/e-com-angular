import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _HttpClient = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() { }

  getProduct(offset: number, limit: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}v1/products?offset=${offset}&limit=${limit}`)
  }

  getSingleProduct(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}v1/products/${id}`)
  }

  getProductsByCategory(id: number): Observable<any> {
    return this._HttpClient.get<any>(`${environment.api}v1/categories/${id}/products?offset=0&limit=10`)
  }

}
