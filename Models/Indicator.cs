using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Indicator
    {
        public string Name { get; set; }
        public ICollection<Registry> Registries { get; set; }
        public IndicatorType Type { get; set; }
        public IIndicatorCalculator IndicatorCalculator { get; set; }

        public Indicator() {
            this.Registries = new List<Registry>();
        }
    }
}
