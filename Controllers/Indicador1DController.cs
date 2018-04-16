using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/[controller]")]
    public class Indicador1DController : Controller
    {
        private static string[] Press = new string[]
        {
            "Think Agro innova con nuevas tecnologias", 
            "Estos son los lideres agros en la region", 
            "¿Cuales son las tendencias de importacion este verano?",
            "Alianza estrategica Think Agro - UTAL",
            "Frutos de Australia",
            "Registro de Arboles ayuda a reforestacion",
        };

        [HttpGet("[action]")]
        public IEnumerable<Registro1D> LoadPress1D()
        {
            var rnd = new Random();
            return Enumerable.Range(1, 5).Select(index => new Registro1D
            {
                Date = DateTime.Now.AddDays(index).ToString("d"),
                Header = Indicador1DController.Press[rnd.Next(0,2)],
                Backup = "$"
            });
        }

        public class Registro1D
        {
            public string Date { get; set; }
            public string Header { get; set; }
            public string Backup { get; set; }

        }
    }
}
