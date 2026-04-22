using EstoqueService.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace EstoqueService.Repositories.Interfaces;

public interface IProdutoRepository
{
    Task<IEnumerable<Produto>> GetAllAsync();
    Task<Produto?> GetByIdAsync(int id);
    Task AddAsync(Produto produto);
    void Update(Produto produto);
    void Remove(Produto produto);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
    Task<IDbContextTransaction> BeginTransactionAsync();
}
