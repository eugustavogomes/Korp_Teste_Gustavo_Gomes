export enum StatusNotaFiscal {
  Emitida = 1,
  Cancelada = 2,
}

export interface ItemNotaFiscal {
  id: number;
  produtoId: number;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface NotaFiscal {
  id: number;
  numero: string;
  status: StatusNotaFiscal;
  dataEmissao: string;
  total: number;
  itens: ItemNotaFiscal[];
}
