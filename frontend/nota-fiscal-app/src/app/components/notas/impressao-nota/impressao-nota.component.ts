// components/notas/impressao-nota.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-impressao-nota',
  templateUrl: './impressao-nota.component.html'
})
export class ImpressaoNotaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  nota: NotaFiscal;
  processando = false;
  erro: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private notaService: NotaFiscalService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carregarNota(id);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  imprimirNota(): void {
    this.processando = true;
    this.erro = null;
    
    this.notaService.imprimirNota(this.nota.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.processando = false)
      )
      .subscribe({
        next: () => {
          alert('Nota impressa com sucesso!');
          this.nota.status = 'Fechada';
        },
        error: (err) => {
          if (err.status === 503) {
            this.erro = 'Serviço temporariamente indisponível. Tente novamente.';
          } else {
            this.erro = err.error?.mensagem || 'Erro ao imprimir nota';
          }
        }
      });
  }
}