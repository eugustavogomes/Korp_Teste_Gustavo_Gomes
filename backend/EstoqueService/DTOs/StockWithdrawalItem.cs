namespace EstoqueService.DTOs;

public record ItemBaixaEstoque
{
    public int ProdutoId { get; init; }
    public int Quantidade { get; init; }
}
