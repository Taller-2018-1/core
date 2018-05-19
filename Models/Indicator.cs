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

        public long IndicatorID { get; set; }
        public string Name { get; set; }
        public ICollection<Registry> Registries { get; set; }
        public ICollection<Goal> Goals { get; set; }
        
        public IndicatorType Type {
            get {
                return type;
            }
            set {
                type = value;
                if (type == IndicatorType.QuantityIndicatorCalculator) {
                    this.IndicatorCalculator = new QuantityIndicatorCalculator();
                }
                else if (type == IndicatorType.PercentIndicatorCalculator)
                {
                    this.IndicatorCalculator = new PercentIndicatorCalculator();
                }
                else {
                    this.IndicatorCalculator = new DefaultIndicatorCalculator();
                }

            }
        }        

        public Indicator() {
            this.Registries = new List<Registry>();
            this.Goals = new List<Goal>();
        }


    }
}
