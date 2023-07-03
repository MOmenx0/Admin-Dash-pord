import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7255/api/User/all';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  softDeleteUserById(id: string): Observable<User> {
    return this.http.delete<User>(`${'https://localhost:7255/api/User/soft'}/${id}`, {});
  }
}
