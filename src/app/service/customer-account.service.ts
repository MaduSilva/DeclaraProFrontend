import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENDPOINTS } from './endpoints';
import api from './api-config';
import {
  CalculatorProps,
  CalculatorResponse,
} from '../types/CustomerAccountTypes';

@Injectable({
  providedIn: 'root',
})
export class CustomerAccountService {
  constructor() {}

  calculate(
    props: CalculatorProps
  ): Observable<AxiosResponse<CalculatorResponse>> {
    return from(
      api.post<any>(ENDPOINTS.CUSTOMER_ACCOUNT.CALCULATE, props)
    ).pipe(
      catchError((error) => {
        console.error('calculate error', error);
        throw error;
      })
    );
  }
}
