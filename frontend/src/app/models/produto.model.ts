export interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  saldo: number;
  saldoReservado: number;
  saldoDisponivel: number;
  dataCriacao?: string;
  dataAtualizacao?: string;
}
