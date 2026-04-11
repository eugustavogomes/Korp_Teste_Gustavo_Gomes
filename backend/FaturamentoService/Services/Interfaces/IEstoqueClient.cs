using FaturamentoService.DTOs;

namespace FaturamentoService.Services.Interfaces;

public interface IEstoqueClient
{
    Task BaixarEstoqueAsync(BaixaEstoqueRequest request);
}
