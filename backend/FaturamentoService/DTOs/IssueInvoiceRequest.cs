namespace FaturamentoService.DTOs;

public record EmitirNotaFiscalRequest
{
    public List<ItemNotaFiscalRequest> Itens { get; init; } = [];
}
