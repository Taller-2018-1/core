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

            // Look for any indicator group.
            if (context.IndicatorGroups.Any())
            {
                return;   // DB has been seeded
            }

            var documents = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca",
                    DocumentName = "articulo1",
                    Extension = ".pdf",
                    Link = "www.utalca.cl"
                }
            };

            foreach(Document document in documents){
                context.Documents.Add(document);
            }
            context.SaveChanges();

            var registries = new Registry[]{
                new LinkRegistry{
                    Name = "Revista Universidad de Talca",
                    Date = DateTime.Today,
                    Documents = documents
                }
            };

            foreach(Registry registry in registries){
                context.Registries.Add(registry);
            }
            context.SaveChanges();

            var indicators = new Indicator[]
            {
                new Indicator{Name="Número de nuevas entidades internacionales vinculadas al CET"},
                new Indicator{Name="Número de nuevas entidades nacionales vinculadas al CET"},
                new Indicator{Name="Número de empresas participantes en actividades de capacitación asociativas"},
                new Indicator{Name="Número de apariciones en prensa digital y escrita", Registries= registries},
                new Indicator{Name="Número de actividades de difusión en la que el CET participa"}
            };
            foreach (Indicator indicator in indicators)
            {
                context.Indicators.Add(indicator);
            }
            context.SaveChanges();

            var indicatorGroups = new IndicatorGroup[]
            {
                new IndicatorGroup{Name="Vinculación con entidades nacionales e internacionales", Indicators=indicators}
            };
            foreach (IndicatorGroup indicatorGroup in indicatorGroups)
            {
                context.IndicatorGroups.Add(indicatorGroup);
            }
            context.SaveChanges();
        }
    }
}
