import { Produto } from './produto.model';

export interface ItemNota {
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
}

export interface NotaFiscal {
  id: number;
  numero: string;
  dataEmissao: string;
  status: string;
  itens: ItemNota[];
  total: number;
}
