using System.Collections.Generic;

namespace Dominio.Entidades.CalculoModulo
{
    public class CalculoDeMulta
    {
        public decimal PercentualMulta { get; set; }
        public List<ParcelaCalculo> parcelasCalculo;

        public CalculoDeMulta()
        {
            parcelasCalculo = new List<ParcelaCalculo>();
        }

        public CalculoDeMulta(decimal percentualMulta, List<ParcelaCalculo> parcelasCalculo)
        {
            PercentualMulta = percentualMulta;
            this.parcelasCalculo = parcelasCalculo;
        }
    }
}
