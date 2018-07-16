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
                if(registry is PercentRegistry)
                {
                    sum += (registry as PercentRegistry).Percent;
                    quantity++;
                }
                else
                    throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
            }
            if(quantity > 0) {
                return sum / quantity;
            }
            else {
                return 0;
            }
        }

        public double Calculate(ICollection<Registry> registries, int year)
        {
            double sum = 0;
            double quantity = 0;
            foreach (Registry registry in registries) {
                if(registry is PercentRegistry && registry.Date.Year == year) {
                    sum += (registry as PercentRegistry).Percent;
                    quantity++;
                }
                else
                    throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
            }
            if(quantity > 0) {
                return sum / quantity;
            }
            else {
                return 0;
            }
        }

        public double CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester)
        {
            return (
                CalculateYearMonth(registries, year, (trimester + 1) * 3) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 1) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 2)
                ) / 3;
        }

        public double CalculateYearMonth(ICollection<Registry> registries, int year, int month)
        {
            double sum = 0;
            double quantity = 0;
            foreach (Registry registry in registries) {
                if(registry is PercentRegistry && registry.Date.Year == year && registry.Date.Month == month) {
                    sum += (registry as PercentRegistry).Percent;
                    quantity++;
                }
                else
                    throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
            }
            if(quantity > 0) {
                return sum / quantity;
            }
            else {
                return 0;
            }
        }

        public double CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            double sum = 0;
            double quantity = 0;
            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);
            foreach (Registry registry in registries)
            {
                for (int j = 0; j < 7; j++)
                {
                    DateTime newDate = date.AddDays(j);
                    if (registry.Date == newDate)
                    {
                        if (registry is PercentRegistry && registry.Date.Year == newDate.Year && registry.Date.Month == newDate.Month)
                        {
                            sum += (registry as PercentRegistry).Percent;
                            quantity++;
                        }
                        else
                            throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
                    }
                }
            }
            if (quantity > 0)
            {
                return sum / quantity;
            }
            else
            {
                return 0;
            }
        }
    }
}
