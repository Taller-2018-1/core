using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/CalcularMostrar1D")]
    public class CalcularMostrar1DController : Controller
    {


        [HttpGet("GetIndicador1D")]
        public Indicador1D GetIndicador1D()
        
        {

            var list = new List<Indicador1D>();

            Recurso recurso1 = new Recurso{
                ID = 1
            };

            Recurso recurso2 = new Recurso{
                ID = 2
            };

            Recurso recurso3 = new Recurso{
                ID = 3
            };

            Recurso recurso4 = new Recurso{
                ID = 4
            };
            Recurso recurso5 = new Recurso{
                ID = 5
            };
            
            Indicador1D indicador1d = new Indicador1D{
                Id = "1D",
                Titulo = "N° aparaciones en la prensa escrita y digital",
                Descripcion = "Este indicador mide cuantas veces el CET(Centro de extensionismo tecnologico) aparece nombrado en algun medio escrito y digital.",
                recursos = new List<Recurso>()
            };

            indicador1d.recursos.Add(recurso1);
            indicador1d.recursos.Add(recurso2);
            indicador1d.recursos.Add(recurso3);
            indicador1d.recursos.Add(recurso4);
            indicador1d.recursos.Add(recurso5);


            list.Add(indicador1d);
            
            return indicador1d;
        }

        /*Clases temporales solamente para simular algunos datos */
        public class Indicador1D
        {
            public string Id { get; set; }
            public string Titulo {get; set; }
            public string Descripcion {get; set;}
            public TipoIndicador TipoIndicador {get;set;}
            public List<Recurso> recursos {get;set;} // me imagino que de aca calculo las apariciones
        }

        public class Recurso
        {
            public long ID { get; set; }

            public DateTime fechaCreacion { get; set; }

        }

        public enum TipoIndicador
        {
            ValorAbsoluto = 0,
            Porcentaje = 1
        }
    }
}
