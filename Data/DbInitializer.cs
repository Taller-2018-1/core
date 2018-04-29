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

            var documents2 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 2",
                    DocumentName = "articulo2",
                    Extension = ".pdf",
                    Link = "www.utalca.cl"
                }
            };
            var documents3 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 3",
                    DocumentName = "articulo3",
                    Extension = ".pdf",
                    Link = "www.utalca.cl"
                }
            };
            var documents4 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 4",
                    DocumentName = "articulo4",
                    Extension = ".pdf",
                    Link = "www.utalca.cl"
                }
            };
            var documents5 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 5",
                    DocumentName = "articulo5",
                    Extension = ".pdf",
                    Link = "www.utalca.cl"
                }
            };

            foreach(Document document in documents){
                context.Documents.Add(document);
            }

            foreach(Document document in documents2){
                context.Documents.Add(document);
            }
            foreach(Document document in documents3){
                context.Documents.Add(document);
            }
            foreach(Document document in documents4){
                context.Documents.Add(document);
            }
            foreach(Document document in documents5){
                context.Documents.Add(document);
            }
            
            var registries = new Registry[]{
                new LinkRegistry{
                    Name = "Revista Universidad de Talca",
                    Date = DateTime.Today,
                    Documents = documents
                },
                new LinkRegistry{
                    Name = "Revista Universidad de Talca 2",
                    Date = DateTime.Today,
                    Documents = documents2
                }
            };
            foreach(Registry registry in registries){
                context.Registries.Add(registry);
            }
            var registries2 = new Registry[]{
                new LinkRegistry{
                    Name = "Revista Universidad de Talca 3",
                    Date = DateTime.Today,
                    Documents = documents3
                },
                new LinkRegistry{
                    Name = "Revista Universidad de Talca 4",
                    Date = DateTime.Today,
                    Documents = documents4
                },
                new LinkRegistry{
                    Name = "Revista Universidad de Talca 5",
                    Date = DateTime.Today,
                    Documents = documents5
                },
                
            };
            foreach(Registry registry in registries2){
                context.Registries.Add(registry);
            }




            

            var indicators = new Indicator[]
            {
                new Indicator{Name="Número de nuevas entidades internacionales vinculadas al CET"},
                new Indicator{Name="Número de nuevas entidades nacionales vinculadas al CET"},
                new Indicator{Name="Número de empresas participantes en actividades de capacitación asociativas"},
                new Indicator{Name="Número de apariciones en prensa digital y escrita"},
                new Indicator{Name="Número de actividades de difusión en la que el CET participa", Registries= registries}
            };
            
            foreach (Indicator indicator in indicators)
            {
                context.Indicators.Add(indicator);
            }

            var indicators2 = new Indicator[]
            {
                new Indicator{Name="Número de académicos que participan en actividades del CET"},
                new Indicator{Name="Número de estudiantes que realizan sus prácticas, tesis, proyectos de mejoramiento, memoria u otra actividad afín al CET",Registries= registries2}
                
            };
            
            foreach (Indicator indicator in indicators2)
            {
                context.Indicators.Add(indicator);
            }


            var indicatorGroups = new IndicatorGroup[]
            {
                new IndicatorGroup{Name="Vinculación con entidades nacionales e internacionales", Indicators=indicators},
                new IndicatorGroup{Name="Vinculación con Académicos y Estudiantes", Indicators=indicators2}
            };
            foreach (IndicatorGroup indicatorGroup in indicatorGroups)
            {
                context.IndicatorGroups.Add(indicatorGroup);
            }
            context.SaveChanges();
        }
    }
}
