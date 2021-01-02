using Dominio.Entidades.CalculoModulo;
using System;
using System.Collections.Generic;

namespace Dominio.Servicos.CalculoModulo
{
    public class ServicoDeDominioDeCalculoDeAtraso
    {
        public void RealizarCalculoDeAtraso(List<ParcelaCalculo> parcelasCalculo)
        {
            var dataAtual = DateTime.Now.Date;

            parcelasCalculo.ForEach(p =>
            {
                if (p.Vencimento < dataAtual)
                    p.Atraso = dataAtual.Subtract(p.Vencimento.Date).Days;
            });
        }
    }
}
