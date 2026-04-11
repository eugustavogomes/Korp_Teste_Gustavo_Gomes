using FaturamentoService.Data;
using FaturamentoService.Models;
using FaturamentoService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FaturamentoService.Repositories;

public class NotaFiscalRepository : INotaFiscalRepository
{
    private readonly FaturamentoDbContext _context;

    public NotaFiscalRepository(FaturamentoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<NotaFiscal>> GetAllAsync()
        => await _context.NotasFiscais
            .Include(n => n.Itens)
            .ToListAsync();

    public async Task<NotaFiscal?> GetByIdAsync(int id)
        => await _context.NotasFiscais.FindAsync(id);

    public async Task<NotaFiscal?> GetByIdWithItensAsync(int id)
        => await _context.NotasFiscais
            .Include(n => n.Itens)
            .FirstOrDefaultAsync(n => n.Id == id);

    public async Task AddAsync(NotaFiscal notaFiscal)
        => await _context.NotasFiscais.AddAsync(notaFiscal);

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}
