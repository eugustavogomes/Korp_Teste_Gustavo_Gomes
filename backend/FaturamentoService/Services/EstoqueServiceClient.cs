namespace FaturamentoService.Services;

public class EstoqueClient : IEstoqueClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<EstoqueClient> _logger;

    public EstoqueClient(HttpClient httpClient, ILogger<EstoqueClient> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task BaixarEstoqueAsync(BaixaEstoqueRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync("api/produtos/baixa-estoque", request);

        if (!response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            _logger.LogError("EstoqueService retornou {Status}: {Content}", response.StatusCode, content);
            response.EnsureSuccessStatusCode();
        }
    }
}
