namespace FaturamentoService.DTOs;

public record ItemNotaFiscalRequest
{
    public int ProdutoId { get; init; }
    public string Descricao { get; init; } = string.Empty;
    public int Quantidade { get; init; }
    public decimal PrecoUnitario { get; init; }
}
