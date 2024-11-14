import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ENDPOINTS } from '../endpoints';
import api from '../api-config';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isCustomerSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isCustomer$ = this.isCustomerSubject.asObservable();

  constructor() {}

  loginAdmin(username: string, password: string): Observable<any> {
    return from(
      api.post<any>(ENDPOINTS.ADMIN.LOGIN, { username, password })
    ).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.data.access);
        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        console.error('loginAdmin error', error);
        throw error;
      })
    );
  }

  loginCustomer(username: string, password: string): Observable<any> {
    return from(
      api.post<any>(ENDPOINTS.CUSTOMERS.LOGIN_CUSTOMER, { username, password })
    ).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.data.access);
        this.isCustomerSubject.next(this.isCustomer());
        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        console.error('loginCustomer error', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  isCustomer(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.isCustomer === true;
      } catch (error) {
        console.error('Error decoding token', error);
        return false;
      }
    }
    return false;
  }

  getUserId(): number | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.user_id;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }
}
