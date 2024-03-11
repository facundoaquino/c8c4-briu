import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductsResponse } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProducts(): Observable<IProductsResponse> {

    return this.http.get<IProductsResponse>(environment.baseApiUrl);
  }
}
