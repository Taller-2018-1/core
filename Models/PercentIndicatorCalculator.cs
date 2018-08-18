using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class PercentIndicatorCalculator : IIndicatorCalculator
    {
        public (double Value, long Quantity) Calculate(ICollection<Registry> registries)
        {
            double sum = 0;
            long quantity = 0;
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
                return (sum / quantity, quantity);
            }
            else {
                return (0, 0);
            }
        }

        public (double Value, long Quantity) CalculateYear(ICollection<Registry> registries, int year)
        {
            double sum = 0;
            long quantity = 0;
            foreach (Registry registry in registries) {
                if(registry is PercentRegistry) {
                    if (registry.Date.Year == year) {
                        sum += (registry as PercentRegistry).Percent;
                        quantity++;
                    }                    
                }
                else
                    throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
            }
            if(quantity > 0) {
                return (sum / quantity, quantity);
            }
            else {
                return (0, 0);
            }
        }

        public (double Value, long Quantity) CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester)
        {
            (double value1, long quantity1) = CalculateYearMonth(registries, year, (trimester + 1) * 3);
            (double value2, long quantity2) = CalculateYearMonth(registries, year, (trimester + 1) * 3 - 1);
            (double value3, long quantity3) = CalculateYearMonth(registries, year, (trimester + 1) * 3 - 2);
            return ( (value1 + value2 + value3) / 3, (quantity1 + quantity2 + quantity3));
        }

        public (double Value, long Quantity) CalculateYearMonth(ICollection<Registry> registries, int year, int month)
        {
            double sum = 0;
            long quantity = 0;
            foreach (Registry registry in registries) {
                if(registry is PercentRegistry) {
                    if (registry.Date.Year == year && registry.Date.Month == month) {
                        sum += (registry as PercentRegistry).Percent;
                        quantity++;
                    }                    
                }
                else
                    throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
            }
            if(quantity > 0) {
                return (sum / quantity, quantity);
            }
            else {
                return (0, 0);
            }
        }

        public (double Value, long Quantity) CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            double sum = 0;
            long quantity = 0;
            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);
            foreach (Registry registry in registries)
            {
                for (int j = 0; j < 7; j++)
                {
                    DateTime newDate = date.AddDays(j);
                    
                    if (registry is PercentRegistry)
                    {
                        if (registry.Date.Year == newDate.Year && registry.Date.Month == newDate.Month && registry.Date.Day == newDate.Day) {
                            sum += (registry as PercentRegistry).Percent;
                            quantity++;
                        }                            
                    }
                    else
                        throw new TypeAccessException("PercentIndicatorCalculator can't work over this type of registry");
                    
                }
            }
            if (quantity > 0)
            {
                return (sum / quantity, quantity);
            }
            else
            {
                return (0, 0);
            }
        }

        public double CalculateGoal(ICollection<Goal> goals)
        {
            if (goals.Any())
            {
                return goals.Max(g => g.Value);
            }
            else
            {
                return 0;
            }
            
        }

        public double CalculateGoalWeek(ICollection<Goal> goals, int startWeekYear, int startWeekMonth, int startWeekDay)
        {
            // startWeekMonth starts in 0 and the month of the goals in the DB starts in 0 too.
            // Add 1 to startWeekMonth to create a DateTime and subtract 1 to compare with the month of the goals

            DateTime date = new DateTime(startWeekYear, startWeekMonth + 1, startWeekDay);
            DateTime newDate = date.AddDays(6);

            var goal1 = goals.Where(g => g.Year == date.Year && g.Month == date.Month - 1).SingleOrDefault();

            var goal2 = goals.Where(g => g.Year == newDate.Year && g.Month == newDate.Month - 1).SingleOrDefault();

            List<Goal> goalsList = new List<Goal>();
            goalsList.Add(goal1);
            goalsList.Add(goal2);
            goalsList.RemoveAll(g => g == null);

            if (goalsList.Any()) {
                return goalsList.Max(g => g.Value);
            }

            return 0;

         }

        public double[] Cumulative(double[] values, long[] quantities)
        {
            double sum = 0;
            double quantity = 0;
            int i = 0;
            List<double> result = new List<double>();
            foreach (double value in values)
            {
                quantity += quantities[i];
                result.Add((sum + value) / quantity);
                sum += value;
                i++;
            }

            result = result.Select(r => Math.Round(r, 2, MidpointRounding.AwayFromZero)).ToList();

            return result.ToArray();
        }

        public double[] CumulativeGoals(double[] values)
        {
            List<double> result = new List<double>();

            for (int i = 1; i <= values.Length; i++) {
                // The max of the first i values
                double max = values.Take(i).Max(v => v);
                result.Add(max);
            }

            result = result.Select(r => Math.Round(r, 2, MidpointRounding.AwayFromZero)).ToList();

            return result.ToArray();
        }

        public double CalculateGoalDay(Goal goal)
        {
            if (goal == null){
                return 0;
            }
            return goal.Value;
        }
    }
}
