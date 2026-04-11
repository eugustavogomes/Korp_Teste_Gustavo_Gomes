namespace EstoqueService.Exceptions;

public class ConcurrencyException : Exception
{
    public ConcurrencyException()
        : base("Outro processo modificou os dados simultaneamente. Tente novamente.") { }
}
