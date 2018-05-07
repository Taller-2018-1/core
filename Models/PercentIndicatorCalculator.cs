using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class PercentIndicatorCalculator : IIndicatorCalculator
    {
        public double Calculate(ICollection<Registry> registries)
        {
            double sum = 0.0;
            int quantity = 0;
            foreach (Registry registry in registries) {
                if(registry.GetType() == typeof(PercentRegistry))
                {
                    sum += (registry as PercentRegistry).Percent;
                    quantity++;
                }
                else if (registry.GetType() == typeof(QuantityRegistry)) { // This isn't necessary, but it works
                    sum += (registry as QuantityRegistry).Quantity;
                    quantity++;
                }
                
            }
            return Math.Round((sum / quantity)/100, 2);
        }
    }
}
