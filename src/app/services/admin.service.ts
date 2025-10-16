import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/metrics`);
  }

  getRecentOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders?limit=10`);
  }

  getTopVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/top-vendors`);
  }
  
}
