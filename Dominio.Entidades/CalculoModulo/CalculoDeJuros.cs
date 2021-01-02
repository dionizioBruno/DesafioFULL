using System.Collections.Generic;

namespace Dominio.Entidades.CalculoModulo
{
    public class CalculoDeJuros
    {
        public decimal PercentualJuros { get; set; }
        public List<ParcelaCalculo> parcelasCalculo;

        public CalculoDeJuros()
        {
            parcelasCalculo = new List<ParcelaCalculo>();
        }

        public CalculoDeJuros(decimal percentualJuros, List<ParcelaCalculo> parcelasCalculo)
        {
            PercentualJuros = percentualJuros;
            this.parcelasCalculo = parcelasCalculo;
        }
    }
}
