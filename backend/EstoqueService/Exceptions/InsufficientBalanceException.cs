namespace EstoqueService.Exceptions;

public class SaldoInsuficienteException : Exception
{
    public SaldoInsuficienteException(string descricao, int disponivel, int solicitado)
        : base($"Saldo insuficiente para '{descricao}': disponível {disponivel}, solicitado {solicitado}") { }
}
