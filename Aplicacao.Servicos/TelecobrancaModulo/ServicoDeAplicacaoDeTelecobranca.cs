using Aplicacao.Entidades.TelecobrancaModulo;
using Dominio.Entidades.CalculoModulo;
using Dominio.Servicos.CalculoModulo;
using System.Collections.Generic;

namespace Aplicacao.Servicos.TelecobrancaModulo
{
    public class ServicoDeAplicacaoDeTelecobranca
    {
        public void RealizarCalculos(CalculoDeJurosMulta calculoDeJurosMulta)
        {
            if (calculoDeJurosMulta.parcelasCalculo.Count > 0)
            {
                var parcelasCalculo = GerarParcelasCalculo(calculoDeJurosMulta.parcelasCalculo);
                var servicoDeDominioDeCalculoDeAtraso = new ServicoDeDominioDeCalculoDeAtraso();
                servicoDeDominioDeCalculoDeAtraso.RealizarCalculoDeAtraso(parcelasCalculo);

                //Cálculo de Juros
                if (calculoDeJurosMulta.PercentualJuros > 0)
                {
                    var calculoDeJuros = new CalculoDeJuros(calculoDeJurosMulta.PercentualJuros, parcelasCalculo);
                    var servicoDeDominioDeCalculoDeJuros = new ServicoDeDominioDeCalculoDeJuros();
                    servicoDeDominioDeCalculoDeJuros.RealizarCalculoDeJuros(calculoDeJuros);
                }

                //Cálculo de Multa
                if (calculoDeJurosMulta.PercentualMulta > 0)
                {
                    var calculoDeMulta = new CalculoDeMulta(calculoDeJurosMulta.PercentualMulta, parcelasCalculo);
                    var servicoDeDominioDeCalculoDeMulta = new ServicoDeDominioDeCalculoDeMulta();
                    servicoDeDominioDeCalculoDeMulta.RealizarCalculoDeMulta(calculoDeMulta);
                }

                calculoDeJurosMulta.parcelasCalculo = GerarParcelas(parcelasCalculo);
            }
        }

        private List<Dominio.Entidades.CalculoModulo.ParcelaCalculo> GerarParcelasCalculo(List<Entidades.TelecobrancaModulo.ParcelaCalculo> parcelasCalculoAplicacao)
        {
            var parcelasCalculoDominio = new List<Dominio.Entidades.CalculoModulo.ParcelaCalculo>();

            parcelasCalculoAplicacao.ForEach(p =>
            {
                parcelasCalculoDominio.Add(new Dominio.Entidades.CalculoModulo.ParcelaCalculo(p.Numero, p.Vencimento, p.Valor, p.Juros, p.Multa));
            });

            return parcelasCalculoDominio;
        }

        private List<Entidades.TelecobrancaModulo.ParcelaCalculo> GerarParcelas(List<Dominio.Entidades.CalculoModulo.ParcelaCalculo> parcelasCalculoDominio)
        {
            var parcelasCalculoAplicacao = new List<Entidades.TelecobrancaModulo.ParcelaCalculo>();

            parcelasCalculoDominio.ForEach(p =>
            {
                parcelasCalculoAplicacao.Add(new Entidades.TelecobrancaModulo.ParcelaCalculo(p.Numero, p.Vencimento, p.Valor, p.Juros, p.Multa, p.Atraso));
            });

            return parcelasCalculoAplicacao;
        }
    }
}
