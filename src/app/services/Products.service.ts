import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductsResponse } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IProvincesResponse } from '../models/provinces';
import { IApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(environment.baseApiUrl);
  }

  getProvinces(): Observable<IProvincesResponse> {
    return this.http.get<IProvincesResponse>(environment.argentinaApi);
  }

  uploadLogo(file: File, name: string, lastname: string): Observable<IApiResponse> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('lastname', lastname);

    return this.http.post<IApiResponse>(`${environment.baseApiUrl}/storage`, formData);
  }
}
