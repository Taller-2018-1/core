using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using think_agro_metrics.Models;

namespace think_agro_metrics.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.IndicatorGroups.Any())
            {
                return;   // DB has been seeded
            }

            var indicators = new Indicator[]
            {
                new Indicator{Name="1A"},
                new Indicator{Name="1B"},
                new Indicator{Name="1C"},
                new Indicator{Name="1D"},
                new Indicator{Name="1E"}
            };
            foreach (Indicator i in indicators)
            {
                context.Indicators.Add(i);
            }
            context.SaveChanges();

            var indicatorGroups = new IndicatorGroup[]
            {
                new IndicatorGroup{Name="1", Indicators=indicators}
            };
            foreach (IndicatorGroup iG in indicatorGroups)
            {
                context.IndicatorGroups.Add(iG);
            }
            context.SaveChanges();
        }
    }
}
