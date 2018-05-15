using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace ThinkAgroMetrics.Controllers
{
    [Produces("application/json")]
    [Route("api/Files")]
    public class FilesController : Controller
    {

        private IHostingEnvironment _hostingEnvironment;

        public FilesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/Files/ASDKFJ"#L$"L#$J!#"#$JLSDG
        [HttpGet("{name}")]
        public IActionResult Download([FromRoute] string name) 
        {
            string folderName = "Repository";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            string fullPath = Path.Combine(newPath, name);

            var locatedFile = System.IO.File.ReadAllBytes(fullPath);
            return new FileContentResult(locatedFile, new
                MediaTypeHeaderValue("application/octet"))
                {
                    FileDownloadName = "descarga.png"
                };
        }
    }
}