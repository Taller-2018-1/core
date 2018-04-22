using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;

namespace think_agro_metrics.Models
{
    public class Indicator
    {
        private IndicatorType type;

        // Don't need to be map in the DB because is assigned through the type.
        [NotMapped]
        public IIndicatorCalculator IndicatorCalculator { get; private set; }

        public string Name { get; set; }
        public ICollection<Registry> Registries { get; set; }
        
        public IndicatorType Type {
            get {
                return type;
            }
            set {
                if (type == IndicatorType.QuantityIndicatorCalculator) {
                    this.IndicatorCalculator = new QuantityIndicatorCalculator();
                }
                if (type == IndicatorType.PercentIndicatorCalculator)
                {
                    this.IndicatorCalculator = new PercentIndicatorCalculator();
                }
                else {
                    this.IndicatorCalculator = null;
                }
                type = value;
            }
        }        

        public Indicator() {
            this.Registries = new List<Registry>();
            this.type = IndicatorType.DefaultIndicatorCalculator;
            this.IndicatorCalculator = null;
        }


    }
}
