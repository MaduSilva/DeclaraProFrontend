import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from './endpoints';
import api from './api-config';
import { ICustomerData } from '../types/CustomerTypes';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}

  getCustomers(): Observable<AxiosResponse<any[]>> {
    return from(api.get<any[]>(ENDPOINTS.CUSTOMERS.GET_ALL)).pipe(
      catchError((error) => {
        console.error('getCustomers error', error);
        throw error;
      })
    );
  }

  getOneCustomer(customerId: number): Observable<AxiosResponse<ICustomerData>> {
    return from(
      api.get<ICustomerData>(ENDPOINTS.CUSTOMERS.GET_ONE(customerId))
    ).pipe(
      catchError((error) => {
        console.error('getOneCustomer error', error);
        throw error;
      })
    );
  }

  getClienteHomeData(
    customerId: number
  ): Observable<AxiosResponse<ICustomerData>> {
    return from(
      api.get<ICustomerData>(
        ENDPOINTS.CUSTOMERS.GET_CLIENTES_HOME_DATA(customerId)
      )
    ).pipe(
      catchError((error) => {
        console.error('getClienteHomeData error', error);
        throw error;
      })
    );
  }

  addCustomer(newCustomer: any): Observable<AxiosResponse<any>> {
    return from(
      api.post<any>(ENDPOINTS.CUSTOMERS.ADD_CUSTOMER, newCustomer)
    ).pipe(
      catchError((error) => {
        console.error('addCustomer error', error);
        throw error;
      })
    );
  }

  deleteCustomer(customerId: any): Observable<AxiosResponse<any>> {
    return from(
      api.delete<any>(ENDPOINTS.CUSTOMERS.DELETE_CUSTOMER(customerId))
    ).pipe(
      catchError((error) => {
        console.error('deleteCustomer error', error);
        throw error;
      })
    );
  }

  editCustomer(
    customerId: number,
    updatedData: any
  ): Observable<AxiosResponse<any>> {
    return from(
      api.patch<any>(ENDPOINTS.CUSTOMERS.EDIT_CUSTOMER(customerId), updatedData)
    ).pipe(
      catchError((error) => {
        console.error('editCustomer error', error);
        throw error;
      })
    );
  }

  editPasswordCustomer(
    customerId: number,
    newPassword: string
  ): Observable<AxiosResponse<any>> {
    const body = { password: newPassword };
    return from(
      api.patch<any>(
        `${ENDPOINTS.CUSTOMERS.RESET_PASSWORD_CUSTOMER(customerId)}`,
        body
      )
    ).pipe(
      catchError((error) => {
        console.error('editPasswordCustomer error', error);
        throw error;
      })
    );
  }
}
