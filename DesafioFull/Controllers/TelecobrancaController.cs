using Aplicacao.Servicos.TelecobrancaModulo;
using DesafioFull.Conversoes;
using DesafioFull.Models.Telecobranca;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DesafioFull.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TelecobrancaController : ControllerBase
    {
        public TelecobrancaController() { }

        [HttpPost]
        [Route("Calcular")]
        public string Calcular([FromBody] string model)
        {
            var calculoModel = JsonConvert.DeserializeObject<CalculoModel>(model);
            var calculoDeJurosMulta = TelecobrancaConversao.Converter(calculoModel);
            var servicoDeAplicacaoDeTelecobranca = new ServicoDeAplicacaoDeTelecobranca();

            servicoDeAplicacaoDeTelecobranca.RealizarCalculos(calculoDeJurosMulta);
            calculoModel.Parcelas = TelecobrancaConversao.Converter(calculoDeJurosMulta.parcelasCalculo);

            return JsonConvert.SerializeObject(calculoModel.Parcelas);
        }
    }
}
