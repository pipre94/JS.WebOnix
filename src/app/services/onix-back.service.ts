import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Observable } from 'rxjs';
import { Properties } from 'app/interfaces/properties';

@Injectable({
  providedIn: 'root'
})
export class OnixBackService {
  // BASE_URL: string = 'http://localhost:8000';
  BASE_URL: string = 'https://api.constructoraonix.com.co';
  constructor(private http: HttpClient) { }
  

  getUser(): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/api/user`);
  }

  getUserById(idUser): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/api/user/${idUser}`);
  }

  addUser(adduser){
    return this.http.post(`${this.BASE_URL}/api/user`, adduser);
  }

  updateUser(idUser,adduser){
    return this.http.put(`${this.BASE_URL}/api/user/${idUser}`,adduser);
  }

  deleteUser(idUser){
    return this.http.delete(`${this.BASE_URL}/api/user/${idUser}`);
  }
}
