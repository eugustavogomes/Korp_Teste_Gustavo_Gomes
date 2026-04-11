using FaturamentoService.Models;

namespace FaturamentoService.Repositories.Interfaces;

public interface INotaFiscalRepository
{
    Task<IEnumerable<NotaFiscal>> GetAllAsync();
    Task<NotaFiscal?> GetByIdAsync(int id);
    Task<NotaFiscal?> GetByIdWithItensAsync(int id);
    Task AddAsync(NotaFiscal notaFiscal);
    Task SaveChangesAsync();
}
