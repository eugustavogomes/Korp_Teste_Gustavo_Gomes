using FluentValidation;
using EstoqueService.DTOs;

namespace EstoqueService.Validators;

public class BaixaEstoqueRequestValidator : AbstractValidator<BaixaEstoqueRequest>
{
    public BaixaEstoqueRequestValidator()
    {
        RuleFor(x => x.Itens)
            .NotEmpty().WithMessage("A lista de itens não pode ser vazia");

        RuleForEach(x => x.Itens).ChildRules(item =>
        {
            item.RuleFor(x => x.ProdutoId)
                .GreaterThan(0).WithMessage("ProdutoId deve ser maior que zero");

            item.RuleFor(x => x.Quantidade)
                .GreaterThan(0).WithMessage("Quantidade deve ser maior que zero");
        });
    }
}
