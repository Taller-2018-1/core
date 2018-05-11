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
            double sum = 0;
            double quantity = 0;
            foreach (Registry registry in registries) {
                if(registry.GetType() == typeof(PercentRegistry))
                {
                    sum += (registry as PercentRegistry).Percent;
                    quantity++;
                }
            }
            if(quantity > 0){
                return sum / quantity;
            }
            else
            {
                return 0;
            }
        }

        public double Calculate(ICollection<Registry> registries, int year)
        {
            double sum = 0;
            double quantity = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year) {
                    sum += (registry as QuantityRegistry).Quantity;
                    quantity++;
                }
            }
            if(quantity > 0){
                return sum / quantity;
            }
            else
            {
                return 0;
            }
        }
    }
}
