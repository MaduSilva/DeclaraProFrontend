import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor() {}

  getCustomers(): Observable<AxiosResponse<any[]>> {
    return from(
      axios.get<any[]>(this.apiUrl + ENDPOINTS.CUSTOMERS.GET_ALL)
    ).pipe(
      catchError((error) => {
        console.error('getCustomers error', error);
        throw error;
      })
    );
  }

  addCustomer(newCustomer: any): Observable<AxiosResponse<any>> {
    return from(
      axios.post<any>(
        this.apiUrl + ENDPOINTS.CUSTOMERS.ADD_CUSTOMER,
        newCustomer
      )
    ).pipe(
      catchError((error) => {
        console.error('addCustomer error', error);
        throw error;
      })
    );
  }
}
