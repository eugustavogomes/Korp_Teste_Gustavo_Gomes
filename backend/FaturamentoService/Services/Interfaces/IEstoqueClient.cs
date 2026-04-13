using FaturamentoService.DTOs;

namespace FaturamentoService.Services.Interfaces;

public interface IEstoqueClient
{
    Task ReservarEstoqueAsync(ReservaEstoqueRequest request);
    Task LiberarReservaAsync(ReservaEstoqueRequest request);
    Task BaixarEstoqueAsync(BaixaEstoqueRequest request);
}
