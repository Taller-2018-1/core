using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    
    [Route("api/[controller]")]
    public class Indicador1EController: Controller {

        private static string [] Eventos = new string[]
        {"Feria Internacional Universidad de Talca",
            "Conferencia Internacional de University of New South Whales",
            "Convención anual Qantas AU"
        };



        [HttpGet("[action]")]
        public IEnumerable<Registro1E> LoadRegistro1E() {
            var rnd = new Random();
            return Enumerable.Range(1, 5).Select(index => new Registro1E
            {
                date = DateTime.Now.AddDays(index).ToString("d"),
                name = Indicador1EController.Eventos[rnd.Next(0, 2)],
                resource = "localhost:5000/detalle1e"
            });
        }

        public class Registro1E {
            public string date {get; set;}
            public string name {get; set;}
            public string resource {get; set;}
        }
    }
}