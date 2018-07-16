using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class DefaultIndicatorCalculator : IIndicatorCalculator
    {
        public double Calculate(ICollection<Registry> registries)
        {           
            return registries.Count;
        }

        public double Calculate(ICollection<Registry> registries, int year)
        {   
            int counter = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year){
                    counter++;
                }
            }
            return counter;
        }

        public double CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester)
        {
            return CalculateYearMonth(registries, year, (trimester + 1) * 3) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 1) +
                CalculateYearMonth(registries, year, (trimester + 1) * 3 - 2);
        }

        public double CalculateYearMonth(ICollection<Registry> registries, int year, int month)
        {   
            int counter = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year && registry.Date.Month == month){
                    counter++;
                }
            }
            return counter;
        }

        public double CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            int counter = 0;
            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);
            foreach (Registry registry in registries)
            {                
                for (int j = 0; j < 7; j++) {
                    DateTime newDate = date.AddDays(j);
                    if (registry.Date.Year == newDate.Year && registry.Date.Month == newDate.Month)
                    {
                        counter++;
                    }
                }                
            }
            return counter;
        }
    }
}
