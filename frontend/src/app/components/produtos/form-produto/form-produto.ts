import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-form-produto',
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './form-produto.html',
  styleUrl: './form-produto.scss',
})
export class FormProduto implements OnInit {
  produto: Partial<Produto> = { codigo: '', descricao: '', saldo: 0 };
  editando = false;
  salvando = false;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.produtoService.buscarProduto(+id).subscribe({
        next: p => (this.produto = p),
        error: () => (this.erro = 'Erro ao carregar produto'),
      });
    }
  }

  salvar(): void {
    this.salvando = true;
    this.erro = null;
    const op: Observable<unknown> = this.editando
      ? this.produtoService.atualizarProduto(this.produto as Produto)
      : this.produtoService.cadastrarProduto(this.produto as Omit<Produto, 'id'>);

    op.subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: () => {
        this.erro = 'Erro ao salvar produto';
        this.salvando = false;
      },
    });
  }
}
