using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Indicador
    {
        private List<Recurso> _recursos;

        #region Propiedades
        public long Id { get; set; }

        public string Titulo { get; set; }

        public string Descripcion { get; set; }

        public TipoIndicador Tipo { get; set; }
        #endregion

        public int ValorTotal()
        {
            return 0;
        }

        #region Recursos
        public List<Recurso> Recursos()
        {
            return null;
        }

        public bool AsociarRecurso(Recurso recurso)
        {
            return false;
        }

        public bool DesasociarRecurso(Recurso recurso)
        {
            return false;
        }
        #endregion
        
    }

    public enum TipoIndicador
    {
        ValorAbsoluto = 0,
        Porcentaje = 1
    }
}
