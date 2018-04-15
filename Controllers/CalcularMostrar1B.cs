using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/[controller]")]
    public class CalcularMostrar1BController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public Calcular Calculos()
        {
            Calcular calculo =new Calcular{
                Largo = Summaries.Length

            };
            return calculo;
            /*return Enumerable.Range(1, 6).Select(index => new WeatherForecast
            {

            });*/
        }

        public class Calcular
        {

            public int Largo { get; set; }
            /*{ 
                get 
                {
                    return Summaries.Length;
                }
            }*/

            
        }

    
    }
}