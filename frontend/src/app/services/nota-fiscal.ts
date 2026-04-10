import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotaFiscal } from '../models/nota-fiscal.model';

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService {
  private apiUrl = 'http://localhost:5001/api/notas-fiscais';

  constructor(private http: HttpClient) {}

  listarNotas(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  buscarNota(id: number): Observable<NotaFiscal> {
    return this.http.get<NotaFiscal>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  criarNota(nota: Partial<NotaFiscal>): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.apiUrl, nota).pipe(
      catchError(this.handleError)
    );
  }

  imprimirNota(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/imprimir`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erro na API:', error);
    return throwError(() => error);
  }
}
