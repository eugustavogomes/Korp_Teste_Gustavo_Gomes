import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProdutoService } from '../../../services/produto.service';
import { NotaFiscalService } from '../../../services/nota-fiscal';
import { Produto } from '../../../models/produto.model';

interface ItemForm {
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
}

@Component({
  selector: 'app-form-nota',
  imports: [
    FormsModule,
    DecimalPipe,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './form-nota.html',
  styleUrl: './form-nota.scss',
})
export class FormNota implements OnInit {
  produtos: Produto[] = [];
  itens: ItemForm[] = [];
  colunas = ['descricao', 'quantidade', 'precoUnitario', 'subtotal', 'remover'];

  produtoSelecionado: Produto | null = null;
  quantidade = 1;
  precoUnitario = 0;

  salvando = false;
  erro: string | null = null;

  constructor(
    private produtoService: ProdutoService,
    private notaService: NotaFiscalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: p => (this.produtos = p),
      error: () => (this.erro = 'Erro ao carregar produtos'),
    });
  }

  get total(): number {
    return this.itens.reduce((s, i) => s + i.quantidade * i.precoUnitario, 0);
  }

  adicionarItem(): void {
    if (!this.produtoSelecionado || this.quantidade <= 0 || this.precoUnitario <= 0) return;
    this.itens = [
      ...this.itens,
      { produto: this.produtoSelecionado, quantidade: this.quantidade, precoUnitario: this.precoUnitario },
    ];
    this.produtoSelecionado = null;
    this.quantidade = 1;
    this.precoUnitario = 0;
  }

  removerItem(index: number): void {
    this.itens = this.itens.filter((_, i) => i !== index);
  }

  emitir(): void {
    if (this.itens.length === 0) return;
    this.salvando = true;
    this.erro = null;

    const request = {
      itens: this.itens.map(i => ({
        produtoId: i.produto.id,
        descricao: i.produto.descricao,
        quantidade: i.quantidade,
        precoUnitario: i.precoUnitario,
      })),
    };

    this.notaService.criarNota(request).subscribe({
      next: () => this.router.navigate(['/notas']),
      error: err => {
        this.erro = err.error?.mensagem || 'Erro ao emitir nota fiscal';
        this.salvando = false;
      },
    });
  }
}
