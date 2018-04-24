﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public interface IIndicatorCalculator
    {
        double Calculate(ICollection<Registry> registries);
    }
}
