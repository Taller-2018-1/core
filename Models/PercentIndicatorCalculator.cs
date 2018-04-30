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
            int sum = 0;
            int quantity = 0;
            foreach (Registry registry in registries) {
                sum += Int32.Parse(registry.Value);
                quantity++;
            }
            return sum / quantity;
        }
    }
}
