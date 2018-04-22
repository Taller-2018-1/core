using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Registry
    {
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Document> Documents { get; set; }

        public Registry() {
            this.Documents = new List<Document>();
        }
    }
}
