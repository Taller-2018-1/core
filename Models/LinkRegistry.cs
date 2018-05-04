using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace think_agro_metrics.Models
{
    public class LinkRegistry : Registry
    {
        public ICollection<LinkWrapper> Links { get; set; }

        public LinkRegistry() {
            this.Links = new List<LinkWrapper>();
        }
    }
}
