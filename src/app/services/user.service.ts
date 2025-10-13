import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.mode';
import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =  'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<UserResponse>{
    return this.http.get<UserResponse>('${this.baseUrl}/${id}');
  }

  create(payload: UserRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(this.baseUrl, payload);
  }

  update(id: number, payload: UserRequest): Observable<UserResponse>{
    return this.http.put<UserResponse>('${this.baseUrl}/${id}', payload);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>('${this.baseUrl}/${id}');
  }
}
