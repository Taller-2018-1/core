using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/Computeandshow1d")]
    public class Computeandshow1dController : Controller
    {


        [HttpGet("GetIndicator1D")]
        public Indicator1D GetIndicator1D()
        
        {

            Resource resource1 = new Resource{
                ID = 1
            };

            Resource resource2 = new Resource{
                ID = 2
            };

            Resource resource3 = new Resource{
                ID = 3
            };

            Resource resource4 = new Resource{
                ID = 4
            };
            Resource resource5 = new Resource{
                ID = 5
            };
            
            Indicator1D indicator1d = new Indicator1D{
                Id = "1D",
                Title = "N° aparaciones en la prensa escrita y digital",
                Description = "Este indicador mide cuantas veces el CET(Centro de extensionismo tecnologico) aparece nombrado en algun medio escrito y digital.",
                TipoIndicador = TipoIndicador.ValorAbsoluto,
                resources = new List<Resource>()

            };

            indicator1d.resources.Add(resource1);
            indicator1d.resources.Add(resource2);
            indicator1d.resources.Add(resource3);
            indicator1d.resources.Add(resource4);
            indicator1d.resources.Add(resource5);
            
            return indicator1d;
        }

        /*Clases temporales solamente para simular algunos datos */
        public class Indicator1D
        {
            public string Id { get; set; }
            public string Title {get; set; }
            public string Description {get; set;}
            public TipoIndicador TipoIndicador {get;set;}
            public List<Resource> resources {get;set;} // me imagino que de aca calculo las apariciones
        }

        public class Resource
        {
            public long ID { get; set; }

            public DateTime DateCreation { get; set; }

        }

        public enum TipoIndicador
        {
            ValorAbsoluto = 0,
            Porcentaje = 1
        }
    }
}
