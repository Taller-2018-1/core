
using System; 
 
using System.Collections.Generic; 
 
using System.Linq; 
 
using System.Threading.Tasks; 
 
using Microsoft.AspNetCore.Mvc; 
 
  
 
namespace think_agro_metrics.Controllers 
 
{ 
 
     
 
    [Route("api/[controller]")] 
 
    public class Indicator1BController: Controller { 
 
  
 
        private static string [] Events = new string[] 
 
        {"AgroSuper", 
 
         "CCU", 
 
         "Cementos BioBio", 
 
         "Unifruti", 
 
         "Soprole",
 
         "CenKiwi" 
 
        }; 
 
 
 
        [HttpGet("[action]")] 
 
        public IEnumerable<Detail1B> GetDetail() { 
 
            var rnd = new Random(); 
 
            return Enumerable.Range(1, 10).Select(index => new Detail1B 
 
            { 
 
                date = DateTime.Now.AddDays(index).ToString("d"), 
 
                name = Indicator1BController.Events[rnd.Next(0, 5)], 
 
                documenturl = "#" 
 
            }); 
 
        } 
 
  
 
        public class Detail1B { 
 
            public string date {get; set;} 
 
            public string name {get; set;} 
 
            public string documenturl {get; set;} 
 
        } 
 
    } 
 
}