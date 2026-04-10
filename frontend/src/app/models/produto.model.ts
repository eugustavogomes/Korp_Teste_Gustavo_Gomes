export interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  saldo: number;
  dataCriacao?: string;
  dataAtualizacao?: string;
}
