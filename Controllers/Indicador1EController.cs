using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    
    [Route("api/[controller]")]
    public class Indicador1EController: Controller {

        private static string [] Events = new string[]
        {"Feria Internacional Universidad de Talca",
            "Conferencia Internacional de University of New South Whales",
            "Convención anual Qantas AU",
            "The ACM-ICPC Contest",
            "Google I/O",
            "Mobile World Congress:MWC18"
        };



        [HttpGet("[action]")]
        public IEnumerable<Registro1E> LoadRegistro1E() {
            var rnd = new Random();
            return Enumerable.Range(1, 10).Select(index => new Registro1E
            {
                date = DateTime.Now.AddDays(index).ToString("d"),
                name = Indicador1EController.Events[rnd.Next(0, 5)],
                documentUrl = "#"
            });
        }

        public class Registro1E {
            public string date {get; set;}
            public string name {get; set;}
            public string documentUrl {get; set;}
        }
    }
}