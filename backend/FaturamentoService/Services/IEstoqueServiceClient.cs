namespace FaturamentoService.Services;

public interface IEstoqueClient
{
    Task BaixarEstoqueAsync(BaixaEstoqueRequest request);
}
