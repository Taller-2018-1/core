using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class IndicatorGroup
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public ICollection<Indicator> Indicators { get; set; }

        public IndicatorGroup() {
            this.Indicators = new List<Indicator>();
        }
    }
}
