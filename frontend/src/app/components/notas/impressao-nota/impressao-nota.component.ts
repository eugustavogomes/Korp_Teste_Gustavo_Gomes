import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NotaFiscal, StatusNotaFiscal } from '../../../models/nota-fiscal.model';
import { NotaFiscalService } from '../../../services/nota-fiscal';

@Component({
  selector: 'app-impressao-nota',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe, MatButtonModule, MatIconModule],
  templateUrl: './impressao-nota.html',
})
export class ImpressaoNotaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  nota: NotaFiscal | null = null;
  processando = false;
  erro: string | null = null;
  StatusNotaFiscal = StatusNotaFiscal;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaFiscalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carregarNota(+id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarNota(id: number): void {
    this.processando = true;
    this.notaService
      .buscarNota(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.processando = false))
      )
      .subscribe({
        next: nota => (this.nota = nota),
        error: () => (this.erro = 'Erro ao carregar nota'),
      });
  }

  imprimir(): void {
    window.print();
  }
}
