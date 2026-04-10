namespace EstoqueService.DTOs;

public class BaixaEstoqueRequest
{
    public List<ItemBaixaEstoque> Itens { get; set; } = new();
}

public class ItemBaixaEstoque
{
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
}
