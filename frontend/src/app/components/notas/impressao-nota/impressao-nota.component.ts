import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NotaFiscal, StatusNotaFiscal } from '../../../models/nota-fiscal.model';
import { NotaFiscalService } from '../../../services/nota-fiscal.service';
import { ProdutoService } from '../../../services/produto.service';
import { ApiError } from '../../../services/error-handler';

@Component({
  selector: 'app-impressao-nota',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, ButtonModule, CardModule, TagModule, TooltipModule],
  templateUrl: './impressao-nota.html',
  styleUrl: './impressao-nota.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpressaoNotaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  nota: NotaFiscal | null = null;
  processando = false;
  confirmando = false;
  erro: ApiError | null = null;
  StatusNotaFiscal = StatusNotaFiscal;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaFiscalService,
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
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
      .pipe(takeUntil(this.destroy$), finalize(() => { this.processando = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: nota => { this.nota = nota; this.cdr.markForCheck(); },
        error: (err: ApiError) => { this.erro = err; },
      });
  }

  confirmarImpressao(): void {
    this.confirmando = true;
    this.cdr.markForCheck();
  }

  cancelarConfirmacao(): void {
    this.confirmando = false;
    this.cdr.markForCheck();
  }

  imprimir(): void {
    if (!this.nota || this.nota.status !== StatusNotaFiscal.Aberta) return;
    this.processando = true;
    this.erro = null;
    this.notaService
      .imprimirNota(this.nota.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.processando = false;
          this.confirmando = false;
          this.produtoService.carregar();
          this.cdr.detectChanges();
          setTimeout(() => {
            window.print(); 
            this.nota!.status = StatusNotaFiscal.Fechada;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (err: ApiError) => {
          this.erro = err;
          this.processando = false;
          this.cdr.markForCheck();
        },
      });
  }

  reimprimir(): void {
    window.print();
  }
}
