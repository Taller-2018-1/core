using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
 
namespace think_agro_metrics.Controllers
{
    
    [Route("api/[controller]")]
    public class Indicator1AController: Controller {
 
        private static string [] Events = new string[]
        {"Feria Internacional Universidad de Talca",
            "Conferencia Internacional de University of New South Whales",
            "Convención anual Qantas AU",
            "The ACM-ICPC Contest",
            "Google I/O",
            "Mobile World Congress:MWC18"
        };

        [HttpGet("[action]")]
        public IEnumerable<Detail1A> GetDetail() {
            var rnd = new Random();
            return Enumerable.Range(1, 10).Select(index => new Detail1A
            {
                date = DateTime.Now.AddDays(index).ToString("d"),
                name = Indicator1AController.Events[rnd.Next(0, 5)],
                documenturl = "#"
            });
        }

        [HttpPost("[action]")]
        public Boolean SaveRegistro([FromBody]Detail1A recurso)
        {
            Console.WriteLine("Registro guardado: " + recurso.name);
            return true;
        }

        public class Detail1A {
            public string date {get; set;}
            public string name {get; set;}
            public string documenturl {get; set;}
        }
    }
}