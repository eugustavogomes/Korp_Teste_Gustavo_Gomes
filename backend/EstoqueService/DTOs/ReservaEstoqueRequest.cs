namespace EstoqueService.DTOs;

public record ReservaEstoqueRequest
{
    public List<ItemReservaEstoque> Itens { get; init; } = [];
}
