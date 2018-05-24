using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public enum RegistryType
    {
        DefaultRegistry = 0, 
        LinkRegistry = 1,
        QuantityRegistry = 2,
        ActivityRegistry = 3,
        PercentRegistry = 4
        // Add other types here if it's necessary
    }
}
