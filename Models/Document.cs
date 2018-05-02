using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace think_agro_metrics.Models
{
    [Table("Documents")]
    public class Document
    {

        public long DocumentID { get; set; }
        public string Name { get; set; }
        public string DocumentName { get; set; }
        public string Extension { get; set; }
        public string Link { get; set; }
        public DateTime Date { get; set; }
        public string Code { get; set; }
        public long RegistryID { get; set; }
        public Document() {
            Date = DateTime.Today;
        }


    }
}
