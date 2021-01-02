using System;

namespace Dominio.Entidades.CalculoModulo
{
    public class ParcelaCalculo
    {
        public int Numero { get; set; }
        public DateTime Vencimento { get; set; }
        public decimal Valor { get; set; }
        public int Atraso { get; set; }
        public decimal Juros { get; set; }
        public decimal Multa { get; set; }

        public ParcelaCalculo() { }

        public ParcelaCalculo(int numero, DateTime vencimento, decimal valor, decimal juros, decimal multa)
        {
            Numero = numero;
            Vencimento = vencimento;
            Valor = valor;
            Juros = juros;
            Multa = multa;
        }
    }
}
