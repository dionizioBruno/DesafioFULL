using Dominio.Entidades.CalculoModulo;
using System;

namespace Dominio.Servicos.CalculoModulo
{
    public class ServicoDeDominioDeCalculoDeJuros
    {
        public void RealizarCalculoDeJuros(CalculoDeJuros calculoDeJuros)
        {
            var percentualJuros = calculoDeJuros.PercentualJuros / 100;

            calculoDeJuros.parcelasCalculo.ForEach(p =>
            {
                if (p.Atraso > 0)
                    p.Juros = Math.Round((percentualJuros / 30) * p.Atraso * p.Valor, 2);
            });
        }
    }
}
