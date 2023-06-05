import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnixInfoformsService {

  // BASE_URL: string = 'http://localhost:8000';
  BASE_URL: string = 'https://api.constructoraonix.com.co';
  constructor(private http:HttpClient) { }

  getInfoForms(){
    return this.http.get<any[]>(`${this.BASE_URL}/api/information`);
  }

  addInfoForms(addInformation){
    return this.http.post(`${this.BASE_URL}/api/information`, addInformation);
  }

  deleteInfoForms(idInfo){
    return this.http.delete(`${this.BASE_URL}/api/information/${idInfo}`);
  }
}
