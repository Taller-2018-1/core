using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/[controller]")]
    public class CalcularMostrar1EController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public Indicador GetIndicador1E()
        {
            
        
        Indicador indicador = new Indicador{
            Id = 1 ,
            Titulo = "Indicador 1" ,
            Descripcion = "Descripcion del indicador 1E1" ,
            indicador = TipoIndicador.Porcentaje,
            recursos = new List<Recurso>()

            
            };
            

            Recurso recurso1 = new Recurso{
                Id = 1 
            
            };
           

            Recurso recurso2 = new Recurso{
                Id = 2 
            
            };
           

            Recurso recurso3 = new Recurso{
                Id = 3 
            
            };

            indicador.recursos.Add(recurso1);
            indicador.recursos.Add(recurso2);
            indicador.recursos.Add(recurso3);
            return indicador;
        }

    
    

    public class Recurso {
        public long Id {get; set;}
        public DateTime FechaCreacion {get; set;}
        string Titulo {get; set;}
        string Link {get; set;}
    }

    

    public class Indicador
    {
        public List<Recurso> recursos = new List<Recurso>();
        public int Id {get; set;}
        public string Titulo {get; set;}
        public string Descripcion {get; set;}
        public TipoIndicador indicador {get; set;}


    }

    public enum TipoIndicador
    {
        ValorAbsoluto = 0,
        Porcentaje = 1
    }

  }
}