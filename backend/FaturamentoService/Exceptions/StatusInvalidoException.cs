namespace FaturamentoService.Exceptions;

public class StatusInvalidoException : Exception
{
    public StatusInvalidoException(string mensagem)
        : base(mensagem) { }
}
