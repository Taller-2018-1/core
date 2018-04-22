using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Document
    {
        public string Name { get; set; }
        public string DocumentName { get; set; }
        public string Extension { get; set; }
        public string Link { get; set; }
        public DateTime Date { get; set; }

        public Document() { }


    }
}
