using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;


namespace think_agro_metrics.Models
{
    public class Indicator
    {
        private RegistryType registriesType;

        // Don't need to be map in the DB because is assigned through the type of the registries.
        [NotMapped]
        public IIndicatorCalculator IndicatorCalculator { get; private set; }        

        public long IndicatorID { get; set; }
        public long IndicatorGroupID { get; set; }
        public string Name { get; set; }
        public ICollection<Registry> Registries { get; set; }
        public ICollection<Goal> Goals { get; set; }
        
        public RegistryType RegistriesType
        {
            get {
                return registriesType;
            }
            set {
                registriesType = value;
                if (registriesType == RegistryType.QuantityRegistry
                    || registriesType == RegistryType.ActivityRegistry) {
                    this.IndicatorCalculator = new QuantityIndicatorCalculator();
                }
                else if (registriesType == RegistryType.PercentRegistry) {
                    this.IndicatorCalculator = new PercentIndicatorCalculator();
                }
                else { //Default and Link Registries
                    this.IndicatorCalculator = new DefaultIndicatorCalculator();
                }

            }
        }        

        public Indicator() {
            this.Registries = new List<Registry>();
            this.Goals = new List<Goal>();
        }


    }
}
