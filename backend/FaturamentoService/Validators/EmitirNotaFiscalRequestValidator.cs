using FluentValidation;
using FaturamentoService.DTOs;

namespace FaturamentoService.Validators;

public class EmitirNotaFiscalRequestValidator : AbstractValidator<EmitirNotaFiscalRequest>
{
    public EmitirNotaFiscalRequestValidator()
    {
        RuleFor(x => x.Itens)
            .NotEmpty().WithMessage("A nota fiscal deve ter ao menos um item");

        RuleForEach(x => x.Itens).ChildRules(item =>
        {
            item.RuleFor(x => x.ProdutoId)
                .GreaterThan(0).WithMessage("ProdutoId deve ser maior que zero");

            item.RuleFor(x => x.Descricao)
                .NotEmpty().WithMessage("Descrição é obrigatória")
                .MaximumLength(200).WithMessage("Descrição não pode ter mais de 200 caracteres");

            item.RuleFor(x => x.Quantidade)
                .GreaterThan(0).WithMessage("Quantidade deve ser maior que zero");

            item.RuleFor(x => x.PrecoUnitario)
                .GreaterThan(0).WithMessage("Preço unitário deve ser maior que zero");
        });
    }
}
