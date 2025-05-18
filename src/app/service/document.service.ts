import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ENDPOINTS } from './endpoints';
import api from './api-config';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  addDocument(
    formData: FormData,
    customerId: number
  ): Observable<AxiosResponse<any>> {
    return from(
      api.post<any>(ENDPOINTS.DOCUMENTS.ADD_DOCUMENT(customerId), formData)
    ).pipe(
      catchError((error) => {
        console.error('addDocument error', error);
        throw error;
      })
    );
  }

  deleteDocument(
    customerId: number,
    documentId: number
  ): Observable<AxiosResponse<any>> {
    return from(
      api.delete<any>(
        `${ENDPOINTS.DOCUMENTS.DELETE_DOCUMENT(customerId, documentId)}`
      )
    ).pipe(
      catchError((error) => {
        console.error('deleteDocument error', error);
        throw error;
      })
    );
  }

  renameDocument(
    customerId: number,
    documentId: number,
    name: string
  ): Observable<AxiosResponse<any>> {
    return from(
      api.put<any>(
        ENDPOINTS.DOCUMENTS.RENAME_DOCUMENT(customerId, documentId),
        { name }
      )
    ).pipe(
      catchError((error) => {
        console.error('renameDocument error', error);
        throw error;
      })
    );
  }
}
