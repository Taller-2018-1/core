using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public enum IndicatorType
    {
        DefaultIndicatorCalculator = -1, // Used by the empty constructor of Indicator required by EntityFramework
        QuantityIndicatorCalculator = 0,
        PercentIndicatorCalculator = 1
        // Add other types here if it's necessary
    }
}
