using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class GrupoIndicadores
    {
        private List<Indicador> _indicadores;

        #region Propiedades
        long Id { get; set; }

        string Descripcion { get; set; }
        #endregion

        #region Indicadores
        /// <summary>
        /// Retorna los indicadores de este grupo utilizando inicialización lazy
        /// </summary>
        /// <returns>Lista de indicadores</returns>
        public List<Indicador> Indicadores()
        {
            return null;
        }
        
        public bool AsociarIndicador(Indicador indicador)
        {
            return false;
        }

        public bool DesasociarIndicador(Indicador indicador)
        {
            return false;
        }
        #endregion
    }
}
