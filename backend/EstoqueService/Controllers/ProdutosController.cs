using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EstoqueService.Data;
using EstoqueService.Models;
using EstoqueService.DTOs;

namespace EstoqueService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly EstoqueDbContext _context;
    private readonly ILogger<ProdutosController> _logger;

    public ProdutosController(EstoqueDbContext context, ILogger<ProdutosController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
    {
        return await _context.Produtos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetProduto(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null)
            return NotFound();
        return produto;
    }

    [HttpPost]
    public async Task<ActionResult<Produto>> CreateProduto([FromBody] Produto produto)
    {
        try
        {
            produto.DataCriacao = DateTime.UtcNow;
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar produto");
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduto(int id, [FromBody] Produto produto)
    {
        if (id != produto.Id)
            return BadRequest("ID da rota não corresponde ao ID do produto");

        try
        {
            produto.DataAtualizacao = DateTime.UtcNow;
            _context.Entry(produto).State = EntityState.Modified;
            _context.Entry(produto).Property(p => p.DataCriacao).IsModified = false;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Produtos.AnyAsync(p => p.Id == id))
                return NotFound();
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao atualizar produto {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        try
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
                return NotFound();

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao deletar produto {Id}", id);
            return StatusCode(500, "Erro interno do servidor");
        }
    }

    [HttpPost("baixa-estoque")]
    public async Task<IActionResult> BaixarEstoque([FromBody] BaixaEstoqueRequest request)
    {
        try
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            foreach (var item in request.Itens)
            {
                var produto = await _context.Produtos
                    .FirstOrDefaultAsync(p => p.Id == item.ProdutoId);

                if (produto == null)
                    return NotFound($"Produto {item.ProdutoId} não encontrado");

                if (produto.Saldo < item.Quantidade)
                    return BadRequest($"Saldo insuficiente para '{produto.Descricao}': disponível {produto.Saldo}, solicitado {item.Quantidade}");

                produto.Saldo -= item.Quantidade;
                produto.DataAtualizacao = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            _logger.LogError(ex, "Erro de concorrência ao baixar estoque");
            return Conflict("Outro processo modificou os dados simultaneamente. Tente novamente.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao baixar estoque");
            return StatusCode(500, "Erro interno do servidor");
        }
    }
}
