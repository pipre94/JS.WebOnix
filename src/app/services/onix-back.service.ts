import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Observable } from 'rxjs';
import { Properties } from 'app/interfaces/properties';

@Injectable({
  providedIn: 'root'
})
export class OnixBackService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProperties(): Observable<Properties[]>{
    return this.http.get<Properties[]>(`${this.BASE_URL}/properties`);
  }
}
