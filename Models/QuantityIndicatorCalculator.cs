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

        public double CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester)
        {
            return CalculateYearMonth(registries, year, (trimester + 1) * 3) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 1) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 2);
        }

        public double CalculateYearMonth(ICollection<Registry> registries,int year, int month)
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

        public double CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            long sum = 0;
            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);
            foreach (Registry registry in registries)
            {
                for (int j = 0; j < 7; j++)
                {
                    DateTime newDate = date.AddDays(j);
                    if (registry.Date.Year == newDate.Year && registry.Date.Month == newDate.Month)
                    {
                        if (registry is QuantityRegistry)
                            sum += (registry as QuantityRegistry).Quantity;
                        else
                            throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                    }
                }
            }
            return sum;
        }
    }
}
