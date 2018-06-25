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

            var IndicatorGroup1 = new IndicatorGroup {Name = "Estimación de aumento de inversiones de las empresas"};
            context.IndicatorGroups.Add(IndicatorGroup1);
            context.SaveChanges();
            CreateIndicatorsGroup1(context, IndicatorGroup1.IndicatorGroupID);
            
            var IndicatorGroup2 = new IndicatorGroup {Name = "Estimación de la creación de nuevos empleos a partir de la prestación de servicios"};
            context.IndicatorGroups.Add(IndicatorGroup2);
            context.SaveChanges();
            CreateIndicatorsGroup2(context, IndicatorGroup2.IndicatorGroupID);

            var IndicatorGroup3 = new IndicatorGroup {Name = "Estimación de la disminución de costos en empresas"};
            context.IndicatorGroups.Add(IndicatorGroup3);
            context.SaveChanges();
            CreateIndicatorsGroup3(context, IndicatorGroup3.IndicatorGroupID);

            var IndicatorGroup4 = new IndicatorGroup {Name = "Estimación del aumento de ventas en empresas"};
            context.IndicatorGroups.Add(IndicatorGroup4);
            context.SaveChanges();
            CreateIndicatorsGroup4(context, IndicatorGroup4.IndicatorGroupID);

            var IndicatorGroup5 = new IndicatorGroup {Name = "Estimación del aumento de productividad en empresas"};
            context.IndicatorGroups.Add(IndicatorGroup5);
            context.SaveChanges();
            CreateIndicatorsGroup5(context, IndicatorGroup5.IndicatorGroupID);

            var IndicatorGroup6 = new IndicatorGroup {Name = "Satisfacción de empresas por servicios prestados"};
            context.IndicatorGroups.Add(IndicatorGroup6);
            context.SaveChanges();
            CreateIndicatorsGroup6(context, IndicatorGroup6.IndicatorGroupID);

            var IndicatorGroup7 = new IndicatorGroup {Name = "Sustentabilidad del CET"};
            context.IndicatorGroups.Add(IndicatorGroup7);
            context.SaveChanges();
            CreateIndicatorsGroup7(context, IndicatorGroup7.IndicatorGroupID);

            var IndicatorGroup8 = new IndicatorGroup {Name = "Mejora de procesos internos CET"};
            context.IndicatorGroups.Add(IndicatorGroup8);
            context.SaveChanges();
            CreateIndicatorsGroup8(context, IndicatorGroup8.IndicatorGroupID);

            var IndicatorGroup9 = new IndicatorGroup {Name = "Prestación de servicios de extensionismo tecnológico a empresas"};
            context.IndicatorGroups.Add(IndicatorGroup9);
            context.SaveChanges();
            CreateIndicatorsGroup9(context, IndicatorGroup9.IndicatorGroupID);

            var IndicatorGroup10 = new IndicatorGroup {Name = "Vinculación con entidades nacionales e internacionales"};
            context.IndicatorGroups.Add(IndicatorGroup10);
            context.SaveChanges();
            CreateIndicatorsGroup10(context, IndicatorGroup10.IndicatorGroupID);

            var IndicatorGroup11 = new IndicatorGroup {Name = "Vinculación con Académicos y Estudiantes"};
            context.IndicatorGroups.Add(IndicatorGroup11);
            context.SaveChanges();
            CreateIndicatorsGroup11(context, IndicatorGroup11.IndicatorGroupID);

            var IndicatorGroup12 = new IndicatorGroup {Name = "Cumplimiento del presupuesto del CET"};
            context.IndicatorGroups.Add(IndicatorGroup12);
            context.SaveChanges();
            CreateIndicatorsGroup12(context, IndicatorGroup12.IndicatorGroupID);

            var IndicatorGroup13 = new IndicatorGroup {Name = "Formación de los profesionales extensionistas e integrantes del equipo de gestión en ámbitos relacionados al Extensionismo tecnológico"};
            context.IndicatorGroups.Add(IndicatorGroup13);
            context.SaveChanges();
            CreateIndicatorsGroup13(context, IndicatorGroup13.IndicatorGroupID);


        }

        // Indicators

        private static Indicator[] CreateIndicatorsGroup1(DataContext context, long groupID)
        {
            var indicator1a = new Indicator { Name = "Cantidad de empresas con aumento de inversión", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "1a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator1a);
            context.SaveChanges();

            var indicator1b = new Indicator { Name = "Porcentaje de aumento de inversión de los clientes asesorados", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "1b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator1b);
            context.SaveChanges();

            var indicators1 = new Indicator[]{
                indicator1a, indicator1b};
            
            return indicators1;
        }
        private static Indicator[] CreateIndicatorsGroup2(DataContext context, long groupID)
        {
            var indicator2a = new Indicator { Name = "Cantidad empresas asesoradas con nuevos empleos formales", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "2a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator2a);
            context.SaveChanges();

            var indicator2b = new Indicator { Name = "Porcentaje aumento empleos de los clientes asesorados/as que declararon nuevos empleos", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "2b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator2b);
            context.SaveChanges();

            var indicators2 = new Indicator[]{
                indicator2a, indicator2b};
            
            return indicators2;
        }
        private static Indicator[] CreateIndicatorsGroup3(DataContext context, long groupID)
        {
            var indicator3a = new Indicator { Name = "Cantiadad empresas con disminución de costos", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "3a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator3a);
            context.SaveChanges();

            var indicator3b = new Indicator { Name = "Porcentaje de disminución de costos de los clientes asesorados/as", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "3b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator3b);
            context.SaveChanges();

            var indicators3 = new Indicator[]{
                indicator3a, indicator3b};
            
            return indicators3;
        }
        private static Indicator[] CreateIndicatorsGroup4(DataContext context, long groupID)
        {
            var indicator4a = new Indicator { Name = "Cantidad empresas con aumento de ventas", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "4a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator4a);
            context.SaveChanges();

            var indicator4b = new Indicator { Name = "Porcentaje de aumento de ventas de los clientes asesorados/as que declararon ventas", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "4b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator4b);
            context.SaveChanges();

            var indicators4 = new Indicator[]{
                indicator4a, indicator4b};
            
            return indicators4;
        }
        private static Indicator[] CreateIndicatorsGroup5(DataContext context, long groupID)
        {
            var indicator5a = new Indicator { Name = "Cantidad de empresas con aumentos de productividad", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "5a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator5a);
            context.SaveChanges();

            var indicator5b = new Indicator { Name = "Porcentaje de aumento de productividad de los clientes asesorados/as", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "5b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator5b);
            context.SaveChanges();

            var indicators5 = new Indicator[]{
                indicator5a, indicator5b};
            
            return indicators5;
        }
        private static Indicator[] CreateIndicatorsGroup6(DataContext context, long groupID)
        {
            var indicator6a = new Indicator { Name = "Porcentaje de Satisfacción de empresas frutícolas", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "6a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator6a);
            context.SaveChanges();

            var indicator6b = new Indicator { Name = "Porcentaje de Satisfacción en diagnósticos", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "6b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator6b);
            context.SaveChanges();

            var indicator6c = new Indicator { Name = "Porcentaje de Satisfacción de empresas agroindustriales", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "6c", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator6c);
            context.SaveChanges();

            var indicators6 = new Indicator[]{
                indicator6a, indicator6b, indicator6c};
            
            return indicators6;
        }
        private static Indicator[] CreateIndicatorsGroup7(DataContext context, long groupID)
        {
            var indicator7a = new Indicator{Name = "Cantidad de proyectos apalancados", RegistriesName = "Proyecto", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "7a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7a);
            context.SaveChanges();

            var indicator7b = new Indicator{Name = "Recursos directos apalancados", RegistriesName = "Proyecto", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7b);
            context.SaveChanges();

            var indicator7c = new Indicator{Name = "Recursos indirectos apalancados", RegistriesName = "Proyecto", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7c", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7c);
            context.SaveChanges();
            
            var indicator7d = new Indicator{Name = "Porcentaje Subsidio por empresa.", RegistriesName = "Empresa", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "7d", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7d);
            context.SaveChanges();

            var indicator7e = new Indicator{Name = "Ingresos por servicios Agroindustriales", RegistriesName = "Servicio", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7e", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7e);
            context.SaveChanges();

            var indicator7f = new Indicator{Name = "Ingresos por servicios Frutícolas", RegistriesName = "Servicio", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7f", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7f);
            context.SaveChanges();

            var indicator7g = new Indicator{Name = "Ingresos por membresías", RegistriesName = "Membresia", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7g", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7g);
            context.SaveChanges();

            var indicator7h = new Indicator{Name = "Cantidad de membresias", RegistriesName = "Membresia", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "7h", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7h);
            context.SaveChanges();

            var indicator7i = new Indicator{Name = "Ingresos por capacitaciones", RegistriesName = "Capacitacion", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7i", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7i);
            context.SaveChanges();

            var indicator7j = new Indicator{Name = "Otros ingresos", RegistriesName = "Actividad", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "7j", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator7j);
            context.SaveChanges();

            var indicators7 = new Indicator[]{
                indicator7a, indicator7b, indicator7c, indicator7d, indicator7e, indicator7f, indicator7g, indicator7h, indicator7i, indicator7j};
            
            return indicators7;
        }
        private static Indicator[] CreateIndicatorsGroup8(DataContext context, long groupID)
        {
            var indicator8a = new Indicator { Name = "Cantidad de procedimientos estandarizados", RegistriesName = "Proceso", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "8a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator8a);
            context.SaveChanges();

            var indicator8b = new Indicator { Name = "Cantidad de mejoras a los procesos realizados", RegistriesName = "Mejora", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "8b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator8b);
            context.SaveChanges();

            var indicator8c = new Indicator { Name = "Porcentaje de satisfacción del equipo extensionista en procesos internos", RegistriesName = "Extensionista", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "8c", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator8c);
            context.SaveChanges();

            var indicators8 = new Indicator[]{
                indicator8a, indicator8b, indicator8c};
            
            return indicators8;
        }
        private static Indicator[] CreateIndicatorsGroup9(DataContext context, long groupID)
        {
            var indicator9a = new Indicator { Name = "Cantidad diagnósticos realizados a Pymes", RegistriesName = "Empresa", RegistriesType = RegistryType.ExternalRegistry, RegistriesDescription = "9a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9a);
            context.SaveChanges();

            var indicator9c = new Indicator { Name = "Cantidad de diagnósticos entregados en plazo estimado", RegistriesName = "Diagnostico", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9c", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9c);
            context.SaveChanges();

            var indicator9d = new Indicator { Name = "Cantidad de diagnósticos entregados fuera de plazo estimado", RegistriesName = "Diagnostico", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9d", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9d);
            context.SaveChanges();

            var indicator9e = new Indicator { Name = "Cantidad de propuestas de mejora en plazo estimado", RegistriesName = "Propuesta", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9e", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9e);
            context.SaveChanges();

            var indicator9f = new Indicator { Name = "Cantidad de propuestas de mejora fuera de plazo estimado", RegistriesName = "Propuesta", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9f", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9f);
            context.SaveChanges();

            var indicator9g = new Indicator { Name = "Cantidad de empresas intervenidas", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9g", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9g);
            context.SaveChanges();

            var indicator9h = new Indicator { Name = "Cantidad de empresas asesoradas individualmente o en proceso de asesoría.", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9h", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9h);
            context.SaveChanges();

            var indicator9i = new Indicator { Name = "Porcentaje de intervenciones efectivamente realizadas", RegistriesName = "Registro", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "9i", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9i);
            context.SaveChanges();

            var indicator9j = new Indicator { Name = "Cobertura territorial", RegistriesName = "Registro", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "9j", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9j);
            context.SaveChanges();

            var indicator9k = new Indicator { Name = "Cantidad de visitas a empresas", RegistriesName = "Diagnostico", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "9k", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9k);
            context.SaveChanges();

            var indicator9l = new Indicator { Name = "Cantidad de servicios que empresas demandan", RegistriesName = "Empresa", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "9l", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator9l);
            context.SaveChanges();

            var indicators9 = new Indicator[] {
                indicator9a, indicator9c, indicator9d, indicator9e, indicator9f, indicator9g, indicator9h, indicator9i, indicator9j, indicator9k, indicator9l};
            
            return indicators9;
        }
        private static Indicator[] CreateIndicatorsGroup10(DataContext context, long groupID)
        {
            var indicator10a = new Indicator{Name = "Cantidad de Nuevas entidades internacionales vinculadas al CET", RegistriesName = "Entidad", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10a);
            context.SaveChanges();

            var indicator10b = new Indicator{Name = "Cantidad de Nuevas entidades nacionales vinculadas al CET", RegistriesName = "Entidad", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10b);
            context.SaveChanges();

            var indicator10c = new Indicator{Name = "Cantidad empresas participantes en actividades de capacitación asociativas", RegistriesName = "Actividad", RegistriesType = RegistryType.QuantityRegistry, RegistriesDescription = "10c", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10c);
            context.SaveChanges();

            var indicator10d = new Indicator{Name = "Cantidad de actividades de difusión en la que el CET participa", RegistriesName = "Actividad", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10d", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10d);
            context.SaveChanges();

            var indicator10e = new Indicator{Name = "Cantidad Apariciones en prensa digital y escrita", RegistriesName = "Aparicion", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10e", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10e);
            context.SaveChanges();

            var indicator10f = new Indicator{Name = "Cantidad de publicaciones en redes sociales", RegistriesName = "Aparicion", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10f", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10f);
            context.SaveChanges();

            var indicator10g = new Indicator{Name = "Cantidad de empresas contactadas por medio plan comunicacional", RegistriesName = "Empresa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "10g", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator10g);
            context.SaveChanges();
            
            var indicators10 = new Indicator[]{
                indicator10a, indicator10b, indicator10c, indicator10d, indicator10e, indicator10f, indicator10g};
            
            return indicators10;
        }
        private static Indicator[] CreateIndicatorsGroup11(DataContext context, long groupID)
        {
            var indicator11a = new Indicator{Name = "Cantidad de académicos que participan en actividades del CET", RegistriesName = "Academico", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "11a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator11a);
            context.SaveChanges();

            var indicator11b = new Indicator{Name = "Cantidad de estudiantes que realizan sus prácticas, tesis, proyectos de mejoramiento, memoria u otra actividad afín al CET", RegistriesName = "Estudiante", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "11b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator11b);
            context.SaveChanges();

            var indicators11 = new Indicator[]{
                indicator11a, indicator11b};
            
            return indicators11;
        }
        private static Indicator[] CreateIndicatorsGroup12(DataContext context, long groupID)
        {
            var indicator12a = new Indicator{Name = "Porcentaje de cumplimiento del presupuesto", RegistriesName = "Registro", RegistriesType = RegistryType.PercentRegistry, RegistriesDescription = "12a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator12a);
            context.SaveChanges();

            var indicators12 = new Indicator[]{
                indicator12a};
            
            return indicators12;
        }
        private static Indicator[] CreateIndicatorsGroup13(DataContext context, long groupID)
        {
            var indicator13a = new Indicator { Name = "Cantidad de programas de formación implementados", RegistriesName = "Programa", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "13a", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator13a);
            context.SaveChanges();

            var indicator13b = new Indicator { Name = "Cantidad de extensionistas y profesionales del Centro formados", RegistriesName = "Profesional", RegistriesType = RegistryType.DefaultRegistry, RegistriesDescription = "13b", IndicatorGroupID = groupID };
            context.Indicators.Add(indicator13b);
            context.SaveChanges();

            var indicators13 = new Indicator[]{
                indicator13a, indicator13b};
            
            return indicators13;
        }
    }
}
