import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { NotaFiscalService } from '../../../services/nota-fiscal';
import { NotaFiscal, StatusNotaFiscal } from '../../../models/nota-fiscal.model';
import { FormNota } from '../form-nota/form-nota';

@Component({
  selector: 'app-lista-notas',
  imports: [RouterLink, DatePipe, DecimalPipe, TableModule, ButtonModule, CardModule, TagModule, TooltipModule, DynamicDialogModule],
  templateUrl: './lista-notas.html',
  styleUrl: './lista-notas.scss',
})
export class ListaNotas implements OnInit {
  notas: NotaFiscal[] = [];
  carregando = false;
  erroCarregamento: string | null = null; // falha do load inicial — exibido no empty state
  erro: string | null = null;             // falha de ação do usuário — exibido como banner
  StatusNotaFiscal = StatusNotaFiscal;

  constructor(
    private notaService: NotaFiscalService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erroCarregamento = null;
    this.notaService.listarNotas().subscribe({
      next: n => { this.notas = n; this.carregando = false; },
      error: () => { this.erroCarregamento = 'Não foi possível carregar as notas fiscais.'; this.carregando = false; },
    });
  }

  abrirNova(): void {
    this.erro = null;
    const ref = this.dialogService.open(FormNota, {
      header: 'Nova Nota Fiscal',
      width: '720px',
      modal: true,
      closable: true,
    });
    ref!.onClose.subscribe((salvo: boolean) => {
      if (salvo) this.carregar();
    });
  }

  cancelar(id: number): void {
    if (!confirm('Deseja cancelar esta nota fiscal?')) return;
    this.erro = null;
    this.notaService.cancelarNota(id).subscribe({
      next: () => this.carregar(),
      error: () => (this.erro = 'Erro ao cancelar nota fiscal'),
    });
  }

  severityStatus(status: StatusNotaFiscal): 'info' | 'secondary' {
    return status === StatusNotaFiscal.Aberta ? 'info' : 'secondary';
  }

  labelStatus(status: StatusNotaFiscal): string {
    return status === StatusNotaFiscal.Aberta ? 'Aberta' : 'Fechada';
  }
}
