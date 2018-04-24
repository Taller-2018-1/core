using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{

    [Route("api/[controller]")]
    public class Indicator1AController : Controller
    {

        private static string[] Events = new string[]
        {"Feria Internacional Universidad de Talca",
            "Conferencia Internacional de University of New South Whales",
            "Convención anual Qantas AU",
            "The ACM-ICPC Contest",
            "Google I/O",
            "Mobile World Congress:MWC18"
        };

        [HttpGet("[action]")]
        public IEnumerable<Detail1A> GetDetail()
        {
            var rnd = new Random();
            return Enumerable.Range(1, 10).Select(index => new Detail1A
            {
                date = DateTime.Now.AddDays(index).ToString("d"),
                name = Indicator1AController.Events[rnd.Next(0, 5)],
                documenturl = "#"
            });
        }

        public class Detail1A
        {
            public string date { get; set; }
            public string name { get; set; }
            public string documenturl { get; set; }
        }

        [HttpGet("GetIndicator1A")]
        public Indicator1A GetIndicator1A()
        {
            Resource resource1 = new Resource
            {
                ID = 1
            };

            Resource resource2 = new Resource
            {
                ID = 2
            };

            Resource resource3 = new Resource
            {
                ID = 3
            };

            Resource resource4 = new Resource
            {
                ID = 4
            };
            Resource resource5 = new Resource
            {
                ID = 5
            };
            Indicator1A indicator1a = new Indicator1A
            {
                Id = "1A",
                Title = "Nº de Nuevas entidades internacionales vinculadas al CET",
                Description = "Este indicador mide el numero de entidades internacionales vinculasdas al CET(Centro de extensionismo tecnológico).",
                TipoIndicador = TipoIndicador.ValorAbsoluto,
                resources = new List<Resource>()

            };
            indicator1a.resources.Add(resource1);
            indicator1a.resources.Add(resource2);
            indicator1a.resources.Add(resource3);
            indicator1a.resources.Add(resource4);
            indicator1a.resources.Add(resource5);

            return indicator1a;
        }

        /*Clases temporales solamente para simular algunos datos */
        public class Indicator1A
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public TipoIndicador TipoIndicador { get; set; }
            public List<Resource> resources { get; set; } // me imagino que de aca calculo las apariciones
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

        /*[HttpGet("[action]")]
        public NumberOfEntities GetNumberOfEntities()
        {
            NumberOfEntities numberOfEntities = new NumberOfEntities();
            numberOfEntities.num = 100;
            return numberOfEntities;
        }
        public class NumberOfEntities
        {
            //public int num {get; set;}
            public int num { get; set; }
        }*/
    }
}