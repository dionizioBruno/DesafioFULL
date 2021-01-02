using System;

namespace DesafioFull.Models.Telecobranca
{
    [Serializable]
    public class ParcelaModel
    {
        public int Numero;
        public DateTime Vencimento;
        public decimal Valor;
        public int Atraso;
        public decimal Juros;
        public decimal Multa;

        public ParcelaModel(int numero, DateTime vencimento, decimal valor, decimal juros, decimal multa, int atraso)
        {
            Numero = numero;
            Vencimento = vencimento;
            Valor = valor;
            Juros = juros;
            Multa = multa;
            Atraso = atraso;
        }
    }
}
