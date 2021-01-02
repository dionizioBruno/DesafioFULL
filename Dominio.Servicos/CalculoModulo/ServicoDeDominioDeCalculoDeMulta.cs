using Dominio.Entidades.CalculoModulo;
using System;

namespace Dominio.Servicos.CalculoModulo
{
    public class ServicoDeDominioDeCalculoDeMulta
    {
        public void RealizarCalculoDeMulta(CalculoDeMulta calculoDeMulta)
        {
            var percentualMulta = calculoDeMulta.PercentualMulta / 100;

            calculoDeMulta.parcelasCalculo.ForEach(p =>
            {
                if (p.Atraso > 0)
                    p.Multa = Math.Round(p.Valor * percentualMulta, 2);
            });
        }
    }
}
