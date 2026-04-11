namespace EstoqueService.Exceptions;

public class ProdutoNotFoundException : Exception
{
    public ProdutoNotFoundException(int id)
        : base($"Produto {id} não encontrado") { }
}
