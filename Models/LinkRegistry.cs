using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace think_agro_metrics.Models
{
    // Required for TPT
    // Reference: https://weblogs.asp.net/manavi/inheritance-mapping-strategies-with-entity-framework-code-first-ctp5-part-2-table-per-type-tpt
    [Table("LinkRegistry")]
    public class LinkRegistry : Registry
    {
        public ICollection<LinkWrapper> Links { get; set; }

        public LinkRegistry() {
            this.Links = new List<LinkWrapper>();
        }
    }
}
