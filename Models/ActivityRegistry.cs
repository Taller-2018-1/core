﻿    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace think_agro_metrics.Models
{
    public class ActivityRegistry : Registry
    {
        public long Quantity { get; set; }

        public ActivityRegistry() { }
    }
}
