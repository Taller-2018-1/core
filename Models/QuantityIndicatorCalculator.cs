using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class QuantityIndicatorCalculator : IIndicatorCalculator
    {
        public (double, long) Calculate(ICollection<Registry> registries)
        {
            long sum = 0;
            long quantity = 0;
            foreach (Registry registry in registries) {
                if(registry is QuantityRegistry)
                {
                    sum += (registry as QuantityRegistry).Quantity;
                    quantity++;
                }
                    
                else
                    throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
            }
            return (sum, quantity);
        }

        public (double, long) CalculateYear(ICollection<Registry> registries,int year)
        {
            long sum = 0;
            long quantity = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year) {
                    if(registry is QuantityRegistry)
                    {
                        sum += (registry as QuantityRegistry).Quantity;
                        quantity++;
                    }
                        
                    else
                        throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                }
            }
            return (sum, quantity);
        }

        public (double, long) CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester)
        {
            (double value1, long quantity1) = CalculateYearMonth(registries, year, (trimester + 1) * 3);
            (double value2, long quantity2) = CalculateYearMonth(registries, year, (trimester + 1) * 3 - 1);
            (double value3, long quantity3) = CalculateYearMonth(registries, year, (trimester + 1) * 3 - 2);
            return ((value1 + value2 + value3), (quantity1 + quantity2 + quantity3));
        }

        public (double, long) CalculateYearMonth(ICollection<Registry> registries,int year, int month)
        {
            long sum = 0;
            long quantity = 0;
            foreach (Registry registry in registries) {
                if(registry.Date.Year == year && registry.Date.Month == month) {
                    if(registry is QuantityRegistry)
                    {
                        sum += (registry as QuantityRegistry).Quantity;
                        quantity++;
                    }                        
                    else
                        throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                }
            }
            return (sum, quantity);
        }

        public (double, long) CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            long sum = 0;
            long quantity = 0;
            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);
            foreach (Registry registry in registries)
            {
                for (int j = 0; j < 7; j++)
                {
                    DateTime newDate = date.AddDays(j);
                    if (registry.Date.Year == newDate.Year && registry.Date.Month == newDate.Month && registry.Date.Day == newDate.Day)
                    {
                        if (registry is QuantityRegistry)
                        {
                            sum += (registry as QuantityRegistry).Quantity;
                            quantity++;
                        }
                            
                        else
                            throw new TypeAccessException("QuantityIndicatorCalculator can't work over this type of registry");
                    }
                }
            }
            return (sum, quantity);
        }

        public double CalculateGoal(ICollection<Goal> goals)
        {
            double result = 0;
            foreach (Goal goal in goals)
            {
                result += goal.Value;
            }
            return result;
        }

        public double CalculateGoalWeek(ICollection<Goal> goals, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            // startWeekMonth starts in 0 and the month of the goals in the DB starts in 0 too.
            // Add 1 to startWeekMonth to create a DateTime and subtract 1 to compare with the month of the goals

            DateTime date = new DateTime(startWeekYear, startWeekMonth + 1, startWeekDay);
            double sum = 0;
            for (int i = 0; i < 7; i++)
            {
                DateTime newDate = date.AddDays(i);
                // The month of the goals in the DB starts at 0
                var goal = goals.Where(g => g.Year == newDate.Year && g.Month == newDate.Month - 1).SingleOrDefault();

                // Return 0 if not found
                if (goal != null)
                {
                    sum += goal.Value / DateTime.DaysInMonth(newDate.Year, newDate.Month);
                }
            }

            return (sum);
        }

        public double[] Cumulative(double[] values, long[] quantities)
        {
            double sum = 0;
            List<double> result = new List<double>();
            foreach (double value in values)
            {
                sum += value;
                result.Add(sum);
            }

            result = result.Select(r => Math.Round(r, 0, MidpointRounding.AwayFromZero)).ToList();

            return result.ToArray();
        }

        public double[] CumulativeGoals(double[] values)
        {
            return this.Cumulative(values, new long[0]);
        }

        public double CalculateGoalDay(Goal goal)
        {
            if (goal == null){
                return 0;
            }
            int year = goal.Year;
            int month = goal.Month + 1;
            return goal.Value / DateTime.DaysInMonth(year, month);
        }
    }
}
