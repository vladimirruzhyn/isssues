import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = environment.HTTP_URL;
  }

  get<T>(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl);
  }
}
