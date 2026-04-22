namespace FaturamentoService.Exceptions;

public class NotaFiscalNotFoundException : Exception
{
    public NotaFiscalNotFoundException(int id)
        : base($"Nota fiscal {id} não encontrada") { }
}
