using System;
using System.Collections.Generic;

namespace DesafioFull.Models.Telecobranca
{
    [Serializable]
    public class CalculoModel
    {
        public decimal PercentualJuros;
        public decimal PercentualMulta;
        public List<ParcelaModel> Parcelas;
    }
}
