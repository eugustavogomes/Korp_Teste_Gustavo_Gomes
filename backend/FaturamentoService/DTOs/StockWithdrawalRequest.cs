namespace FaturamentoService.DTOs;

public record BaixaEstoqueRequest
{
    public List<ItemBaixaEstoque> Itens { get; init; } = [];
}
