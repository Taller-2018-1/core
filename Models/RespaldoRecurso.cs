using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public abstract class RespaldoRecurso
    {
        #region Propiedades
        public long Id { get; set; }

        public DateTime FechaCreacion { get; set; }

        public string Titulo { get; set; }

        public string Link { get; set; }
        #endregion
    }
}
