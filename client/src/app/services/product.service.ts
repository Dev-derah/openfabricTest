import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.apiUrl}/products`, {
      withCredentials: true,
    });
  }

  getProductDetails(productId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/products/getProductDetail/${productId}`,
      {
        withCredentials: true,
      }
    );
  }

  postProduct(body: object): Observable<any> {
    return this.http.post<object>(
      `${environment.apiUrl}/products/create`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  deleteProduct(id:string): Observable<any> {
    return this.http.delete<object>(
      `${environment.apiUrl}/products/delete/${id}`,
    );
  }
}
