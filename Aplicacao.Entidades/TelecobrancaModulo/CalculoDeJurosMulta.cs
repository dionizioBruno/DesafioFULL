using System.Collections.Generic;

namespace Aplicacao.Entidades.TelecobrancaModulo
{
    public class CalculoDeJurosMulta
    {
        public decimal PercentualJuros { get; set; }
        public decimal PercentualMulta { get; set; }
        public List<ParcelaCalculo> parcelasCalculo;

        public CalculoDeJurosMulta()
        {
            parcelasCalculo = new List<ParcelaCalculo>();
        }

        public CalculoDeJurosMulta(decimal percentualJuros, decimal percentualMulta)
        {
            PercentualJuros = percentualJuros;
            PercentualMulta = percentualMulta;
            parcelasCalculo = new List<ParcelaCalculo>();
        }
    }
}
