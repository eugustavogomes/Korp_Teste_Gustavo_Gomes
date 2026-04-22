using FaturamentoService.DTOs;
using FaturamentoService.Models;

namespace FaturamentoService.Services.Interfaces;

public interface INotaFiscalService
{
    Task<IEnumerable<NotaFiscal>> GetAllAsync();
    Task<NotaFiscal?> GetByIdAsync(int id);
    Task<NotaFiscal> EmitirAsync(EmitirNotaFiscalRequest request);
    Task ImprimirAsync(int id);
    Task CancelarAsync(int id);
}
