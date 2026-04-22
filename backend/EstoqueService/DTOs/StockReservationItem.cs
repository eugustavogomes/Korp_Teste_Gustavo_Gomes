namespace EstoqueService.DTOs;

public record ItemReservaEstoque
{
    public int ProdutoId { get; init; }
    public int Quantidade { get; init; }
}
