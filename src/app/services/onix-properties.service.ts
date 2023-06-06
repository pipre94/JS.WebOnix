import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Properties } from 'app/interfaces/properties';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnixPropertiesService {

  // BASE_URL: string = 'http://localhost:8000';
  BASE_URL: string = 'https://api.constructoraonix.com.co'; 
  constructor(private http:HttpClient) {}

  getProperties(): Observable<Properties[]>{
    return this.http.get<Properties[]>(`${this.BASE_URL}/api/properties`);
  }
}
