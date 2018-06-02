using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class QuantityIndicatorCalculator : IIndicatorCalculator
    {
        public double Calculate(ICollection<Registry> registries)
        {
            long sum = 0;
            foreach (Registry registry in registries) {
                if(registry is QuantityRegistry)
                    sum += (registry as QuantityRegistry).Quantity;
                else
                    throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
            }
            return sum;
        }

        public double Calculate(ICollection<Registry> registries,int year)
        {
            long sum = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year) {
                    if(registry is QuantityRegistry)
                        sum += (registry as QuantityRegistry).Quantity;
                    else
                        throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                }
            }
            return sum;
        }

        public double Calculate(ICollection<Registry> registries,int year, int month)
        {
            long sum = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year && registry.Date.Month == month) {
                    if(registry is QuantityRegistry)
                        sum += (registry as QuantityRegistry).Quantity;
                    else
                        throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                }
            }
            return sum;
        }
    }
}
