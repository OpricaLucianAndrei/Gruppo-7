import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsers() {
    let users = this.http.get(`${this.apiUrl}users`);
    console.log(users);
    return users;
  }


}