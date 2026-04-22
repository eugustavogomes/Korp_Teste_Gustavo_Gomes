using EstoqueService.Data;
using EstoqueService.Models;
using EstoqueService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace EstoqueService.Repositories;

public class ProdutoRepository : IProdutoRepository
{
    private readonly EstoqueDbContext _context;

    public ProdutoRepository(EstoqueDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Produto>> GetAllAsync()
        => await _context.Produtos.ToListAsync();

    public async Task<Produto?> GetByIdAsync(int id)
        => await _context.Produtos.FindAsync(id);

    public async Task AddAsync(Produto produto)
        => await _context.Produtos.AddAsync(produto);

    public void Update(Produto produto)
    {
        _context.Entry(produto).State = EntityState.Modified;
        _context.Entry(produto).Property(p => p.DataCriacao).IsModified = false;
    }

    public void Remove(Produto produto)
        => _context.Produtos.Remove(produto);

    public async Task<bool> ExistsAsync(int id)
        => await _context.Produtos.AnyAsync(p => p.Id == id);

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();

    public async Task<IDbContextTransaction> BeginTransactionAsync()
        => await _context.Database.BeginTransactionAsync();
}
