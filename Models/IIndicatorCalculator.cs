using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public interface IIndicatorCalculator
    {
        (double Value, long Quantity) Calculate(ICollection<Registry> registries);
        (double Value, long Quantity) CalculateYear(ICollection<Registry> registries, int year);
        (double Value, long Quantity) CalculateYearTrimester(ICollection<Registry> registries, int year, int trimester);
        (double Value, long Quantity) CalculateYearMonth(ICollection<Registry> registries, int year, int month);
        (double Value, long Quantity) CalculateWeek(ICollection<Registry> registries, int startWeekYear, int startWeekMonth, int startWeekDay);

        double CalculateGoal(ICollection<Goal> goals);
        double CalculateGoalWeek(ICollection<Goal> goals, int startWeekYear, int startWeekMonth, int startWeekDay);
        double CalculateGoalDay(Goal goal);

        double[] Cumulative(double[] values, long[] quantities);
        double[] CumulativeGoals(double[] values);
    }
}
