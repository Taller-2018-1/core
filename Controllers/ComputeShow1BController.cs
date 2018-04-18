using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/[controller]")]
    public class ComputeShow1BController : Controller
    {
        
        /* 
        [HttpGet("[action]")]
        public Calcular Calculos()
        {
            Indicador indicador = Indicadores();

            Calcular calculo =new Calcular{
                Largo = indicador._recursos.Count

            };
            return calculo;
            /*return Enumerable.Range(1, 6).Select(index => new WeatherForecast
            {

            });
        }
        */
        

        [HttpGet("[action]")]
        public Indicator Indicators()
        {
            DateTime dt = DateTime.Now;
            Indicator indicator = new Indicator{
                Id = 1,
                Title = "Indicador 1B",
                Description = "Este indicador ...",

                resources = new List<Resource>()
            };

               
                //for(int i=0; i<5; i++)
                //{
                    /*Recurso recurso1 = new Recurso{
                        Id = 1,
                        FechaCreacion = "20/03/2018",
                        Titulo = "Recurso x",
                        Link = "www.----.cl"
                    });*/

                    for(int i= 0 ; i<5; i++)
                    {
                        Resource resource =  new Resource{
                            Id = i,                            
                            DateCreation = String.Format("{0:dd-MM-yyyy}", dt)
                        };
                        indicator.resources.Add(resource);
                    }
                   

                
                    /*Recurso recurso2 = new Recurso{
                        Id = 2,
                        FechaCreacion = "20/03/2018",
                        Titulo = "Recurso x",
                        Link = "www.----.cl"
                    });

                    _recursos.Add(recurso2);*/      

                //}
                

            return indicator;
            /*return Enumerable.Range(1, 6).Select(index => new WeatherForecast
            {

            });*/
        }

        
        /* 
        [HttpGet("[action]")]
        public Recurso Recursos()
        {
            Recurso recurso =new Recurso{
                Id = 1,
                FechaCreacion = "20/03/2018",
                Titulo = "Recurso x",
                Link = "www.----.cl"
                
            };
            return recurso;
        }
        */
    }

    public class Indicator
    {
        public List<Resource> resources;

        #region Properties
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }


        //public TipoIndicador Tipo { get; set; }
        #endregion

    }
    public class Resource
    {
        #region Properties
        public long Id { get; set; }

        public string DateCreation { get; set; }

        public string Title { get; set; }

        public string Link { get; set; }
        #endregion
    }    

    
}