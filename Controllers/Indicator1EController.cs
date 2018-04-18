using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace think_agro_metrics.Controllers
{
    [Route("api/[controller]")]
    public class Indicator1EController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public Indicator GetIndicator1E()
        {
        Indicator indicator = new Indicator{
            id = 1 ,
            title = "Indicator 1" ,
            description = "Description of indicator 1E" ,
            //indicator = TipeIndicator.percentaje,
            resource = new List<Resource>()
            };

            Resource resource1 = new Resource{
                id = 1 
            };
            Resource resource2 = new Resource{
                id = 2 
            };
            Resource resource3 = new Resource{
                id = 3 
            };

            indicator.resource.Add(resource1);
            indicator.resource.Add(resource2);
            indicator.resource.Add(resource3);
            return indicator;
        }

    public class Resource {
        public int id {get; set;}
        public DateTime dateCreation {get; set;}
        string title {get; set;}
        string link {get; set;}
    }

    public class Indicator
    {
        public List<Resource> resource {get;set;}
        public int id {get; set;}
        public string title {get; set;}
        public string description {get; set;}
        public TipeIndicator indicator {get; set;}
    }

    public enum TipeIndicator
    {
         absoluteValue = 0,
        percentaje = 1
    }

  }
}