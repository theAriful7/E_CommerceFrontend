import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

    private baseUrl = 'http://localhost:8080/api/addresses';

  constructor(private http: HttpClient) {}

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}`);
  }

  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}`, address);
  }

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
