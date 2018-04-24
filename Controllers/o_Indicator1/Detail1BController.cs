using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ThinkAgroMetrics.Model.Indicator1;

namespace ThinkAgroMetrics.Controllers {
  [Route ("api/indicator1/[controller]")]
  public class Detail1BController : Controller {
    private static string[] Events = new string[] {
      "AgroSuper",
      "CCU",
      "Cementos BioBio",
      "Unifruti",
      "Soprole",
      "CenKiwi"
    };

    [HttpGet ("[action]")]
    public IEnumerable<Detail1B> Index () {
      var rnd = new Random ();
      return Enumerable.Range (1, 10).Select (index => new Detail1B {
          date = DateTime.Now.AddDays (index).ToString ("d"),
          name = Detail1BController.Events[rnd.Next (0, 5)],
          documenturl = "#"
        });
    }
  }
}