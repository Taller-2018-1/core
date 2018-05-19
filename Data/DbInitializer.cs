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

            // LINKS
            LinkWrapper link1 = new LinkWrapper { Value = "www.link1.com" };
            LinkWrapper link2 = new LinkWrapper { Value = "www.link2.com" };
            LinkWrapper link3 = new LinkWrapper { Value = "www.link3.com" };
            LinkWrapper link4 = new LinkWrapper { Value = "www.link4.com" };
            context.Links.AddRange(link1, link2, link3, link4);


            // DOCUMENTS
            var documents1d1 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca",
                    DocumentName = "articulo1",
                    Extension = ".pdf",
                    Link = "www.utalca.cl",
                    RegistryID = 1
                },
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 2",
                    DocumentName = "articulo2",
                    Extension = ".pdf",
                    Link = "www.utalca.cl",
                    RegistryID = 2
                }
            };

            var documents1d2 = new Document[]{
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 3",
                    DocumentName = "articulo2",
                    Extension = ".pdf",
                    Link = "www.utalca.cl",
                    RegistryID = 3
                },
                new Document{
                    Name = "Artículo de la Revista de la Universidad de Talca 4",
                    DocumentName = "articulo2",
                    Extension = ".pdf",
                    Link = "www.utalca.cl",
                    RegistryID = 4
                }
            };

            context.Documents.AddRange(documents1d1);
            context.Documents.AddRange(documents1d2);

            // REGISTRIES
            var registries1a = new Registry[]
            {
                new DefaultRegistry{
                    Name = "AgroIndustry",
                    Date = DateTime.Today,
                    Documents = null //documents1a1
                },
                new DefaultRegistry{
                    Name = "FruitCompany",
                    Date = DateTime.Today,
                    Documents = null //documents1a2
                },
            };

            var registries1b = new Registry[]
            {
                new DefaultRegistry{
                    Name = "Agrosuper",
                    Date = DateTime.Today,
                    Documents = null //documents1b1
                },
                new DefaultRegistry{
                    Name = "Agrozzi",
                    Date = DateTime.Today,
                    Documents = null //documents1b2
                }
            };

            var registries1c = new QuantityRegistry[]
            {
                new QuantityRegistry{
                    Name = "Reunión de empresas agrícolas",
                    Date = DateTime.Today,
                    Quantity = 10,
                    Documents = null //documents1c1
                },
                new QuantityRegistry{
                    Name = "Reunión de empresas frutícolas",
                    Date = DateTime.Today,
                    Quantity = 17,
                    Documents = null //documents1c2
                }
            };

            var registries1d = new LinkRegistry[]{
                new LinkRegistry{
                    Name = "Revista Universidad de Talca",
                    Date = DateTime.Today,
                    Documents = documents1d1,
                    Links = new LinkWrapper[]{link1, link2}
                },
                new LinkRegistry{
                    Name = "Revista Universidad de Talca 2",
                    Date = DateTime.Today,
                    Documents = documents1d2,
                    Links = new LinkWrapper[]{link3, link4}
                }
            };

            var registries1e = new Registry[]
            {
                new DefaultRegistry{
                    Name = "Actividad de difusión 1",
                    Date = DateTime.Today,
                    Documents = null //documents1e1
                },
                new DefaultRegistry{
                    Name = "Actividad de difusión 2",
                    Date = DateTime.Today,
                    Documents = null //documents1e2
                }
            };

             var registries3b = new QuantityRegistry[]
            {
                new QuantityRegistry{
                    Name = "Reunión de empresas agrícolas",
                    Date = DateTime.Today,
                    Quantity = 10,
                    Documents = null //documents1c1
                },
                new QuantityRegistry{
                    Name = "Reunión de empresas frutícolas",
                    Date = DateTime.Today,
                    Quantity = 5,
                    Documents = null //documents1c2
                }
            };
            var registries4a = new Registry[]
            {
                new QuantityRegistry{
                    Name = "Empresa 1",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4a1
                },

                new QuantityRegistry{
                    Name = "Empresa 2",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4a2
                },
                
                new QuantityRegistry{
                    Name = "Empresa 3",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4a3
                }
            };

            var registries4b = new Registry[]
            {   
                new QuantityRegistry{
                    Name = "Empresa 1",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4b1
                },
                new QuantityRegistry{
                    Name = "Empresa 2",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4a2
                },
                
                new QuantityRegistry{
                    Name = "Empresa 3",
                    Date = DateTime.Today,
                    Quantity = 1,
                    Documents = null //documents4a3
                }    
            };

            var registries4c = new Registry[]
            {
                new PercentRegistry{
                    Name = "Dole",
                    Date = DateTime.Today,
                    Percent = 25,
                    Documents = null //documents4c1
                },

                new PercentRegistry
                {
                    Name = "Santa Margarita",
                    Date = DateTime.Today,
                    Percent = 17,
                    Documents = null //documents4c2
                }
            };

            var registries4d = new Registry[]
            {
                new PercentRegistry{
                    Name = "Dole",
                    Date = DateTime.Today,
                    Percent = 25,
                    Documents = null //documents4d1
                },

                new PercentRegistry
                {
                    Name = "Santa Margarita",
                    Date = DateTime.Today,
                    Percent = 17,
                    Documents = null //documents4d2
                },

                new PercentRegistry
                {
                    Name = "Tio Genaro",
                    Date = DateTime.Today,
                    Percent = 40,
                    Documents = null //documents4d3
                }
            };

            context.Registries.AddRange(registries1a);
            context.Registries.AddRange(registries1b);
            context.Registries.AddRange(registries1c);
            context.Registries.AddRange(registries1d);
            context.Registries.AddRange(registries1e);
            context.Registries.AddRange(registries4a);
            context.Registries.AddRange(registries4b);
            context.Registries.AddRange(registries4c);
            context.Registries.AddRange(registries4d);


            // GOALS
            var goals1a = new Goal[] {
                new Goal { Year=2018, Value=25 },
                new Goal { Year=2019, Value=30 }
            };
            var goals1b = new Goal[] {
                new Goal { Year=2018, Value=15 },
                new Goal { Year=2019, Value=20 }
            };
            var goals1c = new Goal[] {
                new Goal { Year=2018, Value=50 },
                new Goal { Year=2019, Value=60 }
            };
            var goals1d = new Goal[] {
                new Goal { Year=2018, Value=10 },
                new Goal { Year=2019, Value=30 }
            };
            var goals1e = new Goal[] {
                new Goal { Year=2018, Value=15 },
                new Goal { Year=2019, Value=20 }
            };
            
            context.Goals.AddRange(goals1a);
            context.Goals.AddRange(goals1b);
            context.Goals.AddRange(goals1c);
            context.Goals.AddRange(goals1d);
            context.Goals.AddRange(goals1e);

            // INDICATORS
            var indicators1 = new Indicator[]
            {
                new Indicator{Name="Número de nuevas entidades internacionales vinculadas al CET", Registries = registries1a, Goals = goals1a},
                new Indicator{Name="Número de nuevas entidades nacionales vinculadas al CET", Registries = registries1b, Goals = goals1b},
                new Indicator{Name="Número de empresas participantes en actividades de capacitación asociativas", Registries = registries1c, Type = IndicatorType.QuantityIndicatorCalculator, Goals = goals1c},
                new Indicator{Name="Número de apariciones en prensa digital y escrita", Registries = registries1d, Goals = goals1d},
                new Indicator{Name="Número de actividades de difusión en la que el CET participa", Registries = registries1e, Goals = goals1e}
            };

            var indicators2 = new Indicator[]
            {
                new Indicator{Name="Número de académicos que participan en actividades del CET"},
                new Indicator{Name="Número de estudiantes que realizan sus prácticas, tesis, proyectos de mejoramiento, memoria u otra actividad afín al CET"}
            };

            var indicators3 = new Indicator[]
            {
                new Indicator{Name="Número de programas de formación implementados"},
                new Indicator{Name="Número de extensionistas y profesionales del Centro formados", Registries = registries3b,Type=IndicatorType.QuantityIndicatorCalculator}
            };

            var indicators4 = new Indicator[]
            {
                new Indicator{Name="Número diagnósticos realizados a Pymes", Registries = registries4a, Type=IndicatorType.QuantityIndicatorCalculator},
                new Indicator{Name="Número de empresas asesoradas individualmente o en proceso de asesoria.", Registries = registries4b, Type=IndicatorType.QuantityIndicatorCalculator},
                new Indicator{Name="Porcentaje de intervenciones efectivamente realizadas", Registries = registries4c, Type=IndicatorType.PercentIndicatorCalculator},
                new Indicator{Name="Porcentaje de subsidio por empresa.", Registries = registries4d, Type =IndicatorType.PercentIndicatorCalculator}

            };

            var indicators5 = new Indicator[]
            {
                new Indicator{Name="Porcentaje de satisfacción de empresas frutícolas"},
                new Indicator{Name="Porcentaje de satisfacción de empresas agroindustriales"}
            };

            var indicators6 = new Indicator[]
            {
                new Indicator{Name="Número de empresas con aumentos de productividad"},
                new Indicator{Name="Porcentaje de aumento de productividad de los clientes asesorados/as"}
            };

            var indicators7 = new Indicator[]
            {
                new Indicator{Name="Número de empresas con aumento de ventas"},
                new Indicator{Name="Porcentaje de aumento de ventas de los clientes asesorados/as que declararon ventas"}
            };

             var indicators8 = new Indicator[]
            {
                new Indicator{Name="Número de empresas con disminución de costos"},
                new Indicator{Name="Porcentaje de disminución de costos de los clientes asesorados/as"}
            };

            var indicators9 = new Indicator[]
            {
                new Indicator{Name="Número de empresas asesoradas con nuevos empleos formales"},
                new Indicator{Name="Porcentaje de aumento empleos de los clientes asesorados/as que declararon nuevos empleos"}
            };

            var indicators10 = new Indicator[]
            {
                new Indicator{Name="Número de empresas con aumento de inversión"},
                new Indicator{Name="Porcentaje de aumento de inversión de los clientes asesorados"}
            };

            context.Indicators.AddRange(indicators1); context.SaveChanges(); // Saved here to keep the indicators in order in the DB
            context.Indicators.AddRange(indicators2); context.SaveChanges();
            context.Indicators.AddRange(indicators3); context.SaveChanges();
            context.Indicators.AddRange(indicators4); context.SaveChanges();
            context.Indicators.AddRange(indicators5); context.SaveChanges();
            context.Indicators.AddRange(indicators6); context.SaveChanges();
            context.Indicators.AddRange(indicators7); context.SaveChanges();
            context.Indicators.AddRange(indicators8); context.SaveChanges();
            context.Indicators.AddRange(indicators9); context.SaveChanges();
            context.Indicators.AddRange(indicators10); context.SaveChanges();


            // INDICATOR GROUPS
            var indicatorGroups = new IndicatorGroup[]
            {
                new IndicatorGroup{Name="Vinculación con entidades nacionales e internacionales", Indicators=indicators1},
                new IndicatorGroup{Name="Vinculación con académicos y estudiantes", Indicators=indicators2},
                new IndicatorGroup{Name="Formación de los profesionales extensionistas e integrantes del equipo de gestión, en ámbitos relacionados al extensionismo tecnológico", Indicators=indicators3},
                new IndicatorGroup{Name="Prestación de servicios de extensionismo tecnológico a empresas", Indicators=indicators4},
                new IndicatorGroup{Name="Satisfacción de empresas por servicios prestados", Indicators=indicators5},
                new IndicatorGroup{Name="Estimación del aumento de productividad en empresas", Indicators=indicators6},
                new IndicatorGroup{Name="Estimación del aumento de ventas en empresas", Indicators=indicators7},
                new IndicatorGroup{Name="Estimación de la disminución de costos en empresas", Indicators=indicators8},
                new IndicatorGroup{Name="Estimación de la creación de nuevos empleos a partir de la prestación de servicios", Indicators=indicators9},
                new IndicatorGroup{Name="Estimación de aumento de inversiones de las empresas", Indicators=indicators10},
            };

            context.IndicatorGroups.AddRange(indicatorGroups);
            
            context.SaveChanges();
        }
    }
}
