import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NotaFiscal } from '../../../models/nota-fiscal.model';
import { NotaFiscalService } from '../../../services/nota-fiscal';

@Component({
  selector: 'app-impressao-nota',
  standalone: true,
  templateUrl: './impressao-nota.html'
})
export class ImpressaoNotaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  nota: NotaFiscal | null = null;
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

  carregarNota(id: number): void {
    this.processando = true;
    this.notaService.buscarNota(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.processando = false)
      )
      .subscribe({
        next: (nota) => this.nota = nota,
        error: (err: any) => {
          this.erro = err.error?.mensagem || 'Erro ao carregar nota';
        }
      });
  }

  imprimirNota(): void {
    if (!this.nota) return;
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
          if (this.nota) this.nota.status = 'Fechada';
        },
        error: (err: any) => {
          if (err.status === 503) {
            this.erro = 'Serviço temporariamente indisponível. Tente novamente.';
          } else {
            this.erro = err.error?.mensagem || 'Erro ao imprimir nota';
          }
        }
      });
  }
}
