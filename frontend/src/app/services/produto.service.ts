import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:5001/api/produtos';
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  public produtos$ = this.produtosSubject.asObservable();

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      retry(2),
      tap(produtos => this.produtosSubject.next(produtos)),
      catchError(this.handleError)
    );
  }

  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto).pipe(
      tap(() => this.listarProdutos().subscribe()),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erro na API:', error);
    return throwError(() => new Error('Erro ao comunicar com o servidor'));
  }
}
