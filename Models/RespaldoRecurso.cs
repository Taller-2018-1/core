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
        
        public bool Crear()
        {
            return false;
        }

        public bool Seleccionar()
        {
            return false;
        }

        public bool Modificar()
        {
            return false;
        }

        public bool Eliminar()
        {
            return false;
        }
    }
}
