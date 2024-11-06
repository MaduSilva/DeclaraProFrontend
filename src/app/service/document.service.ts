import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { ENDPOINTS } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = 'http://127.0.0.1:8000';

  addDocument(
    formData: FormData,
    customerId: number
  ): Observable<AxiosResponse<any>> {
    return from(
      axios.post<any>(
        this.apiUrl + ENDPOINTS.DOCUMENTS.ADD_DOCUMENT(customerId),
        formData
      )
    ).pipe(
      catchError((error) => {
        console.error('addDocument error', error);
        throw error;
      })
    );
  }
}
