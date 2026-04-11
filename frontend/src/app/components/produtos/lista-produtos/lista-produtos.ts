import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';
import { FormProduto } from '../form-produto/form-produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [TableModule, ButtonModule, CardModule, TooltipModule, DynamicDialogModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.scss',
})
export class ListaProdutos implements OnInit {
  produtos: Produto[] = [];
  carregando = false;
  erroCarregamento: string | null = null;
  erro: string | null = null;

  constructor(
    private produtoService: ProdutoService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erroCarregamento = null;
    this.produtoService.listarProdutos().subscribe({
      next: p => { this.produtos = p; this.carregando = false; },
      error: () => { this.erroCarregamento = 'Não foi possível carregar os produtos.'; this.carregando = false; },
    });
  }

  abrirNovo(): void {
    this.erro = null;
    const ref = this.dialogService.open(FormProduto, {
      header: 'Novo Produto',
      width: '480px',
      modal: true,
    });
    ref!.onClose.subscribe((salvo: boolean) => {
      if (salvo) this.carregar();
    });
  }

  abrirEditar(produto: Produto): void {
    this.erro = null;
    const ref = this.dialogService.open(FormProduto, {
      header: 'Editar Produto',
      width: '480px',
      modal: true,
      data: { id: produto.id },
    });
    ref!.onClose.subscribe((salvo: boolean) => {
      if (salvo) this.carregar();
    });
  }

  excluir(id: number): void {
    if (!confirm('Deseja excluir este produto?')) return;
    this.erro = null;
    this.produtoService.excluirProduto(id).subscribe({
      next: () => this.carregar(),
      error: () => (this.erro = 'Erro ao excluir produto'),
    });
  }
}
