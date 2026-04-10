namespace FaturamentoService.DTOs;

public class EmitirNotaFiscalRequest
{
    public List<ItemNotaFiscalRequest> Itens { get; set; } = new();
}

public class ItemNotaFiscalRequest
{
    public int ProdutoId { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }
}
