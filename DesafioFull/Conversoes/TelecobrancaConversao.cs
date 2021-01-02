using Aplicacao.Entidades.TelecobrancaModulo;
using DesafioFull.Models.Telecobranca;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioFull.Conversoes
{
    public static class TelecobrancaConversao
    {
        public static CalculoDeJurosMulta Converter(CalculoModel calculoModel)
        {
            var calculoDeJurosMulta = new CalculoDeJurosMulta(calculoModel.PercentualJuros, calculoModel.PercentualMulta);

            calculoModel.Parcelas.ForEach(p =>
            {
                calculoDeJurosMulta.parcelasCalculo.Add(new ParcelaCalculo(p.Numero, p.Vencimento, p.Valor, p.Juros, p.Multa, p.Atraso));
            });

            return calculoDeJurosMulta;
        }

        public static List<ParcelaModel> Converter(List<ParcelaCalculo> parcelasCalculo)
        {
            var parcelas = new List<ParcelaModel>();

            parcelasCalculo.ForEach(p =>
            {
                parcelas.Add(new ParcelaModel(p.Numero, p.Vencimento, p.Valor, p.Juros, p.Multa, p.Atraso));
            });

            return parcelas;
        }
    }
}
