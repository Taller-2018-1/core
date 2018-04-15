using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Recurso
    {
        private List<RespaldoRecurso> _respaldos;

        #region Propiedades
        public long ID { get; set; }

        public DateTime fechaCreacion { get; set; }
        #endregion

        #region Respaldos
        public List<RespaldoRecurso> Respaldos()
        {
            return null;
        }

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
        
        public bool AsociarRespaldo(RespaldoRecurso respaldoRecurso)
        {
            return false;
        }

        public bool DesasociarRespaldo(RespaldoRecurso respaldoRecurso)
        {
            return false;
        }
        #endregion
    }
}
