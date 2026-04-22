namespace EstoqueService.Exceptions;

public class ReservaInsuficienteException : Exception
{
    public ReservaInsuficienteException(string descricao, int reservado, int solicitado)
        : base($"Reserva insuficiente para '{descricao}': reservado {reservado}, solicitado {solicitado}") { }
}
