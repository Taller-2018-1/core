using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public enum IndicatorType
    {
        DefaultIndicatorCalculator = 0, // Used by the empty constructor of Indicator required by EntityFramework (and the most common one)
        QuantityIndicatorCalculator = 1,
        PercentIndicatorCalculator = 2
        // Add other types here if it's necessary
    }
}
