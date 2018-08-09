using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Role
    {
        public long RoleID { get; set; } // Role ID for the database 
        public string RoleName { get; set; }
        public string RoleToken { get; set; } // The real RoleID
        public List<Indicator> PermissionsRead { get; set; }
        public List<Indicator> PermissionsWrite { get; set; }

        public Role()
        {
            this.PermissionsRead = new List<Indicator>();
            this.PermissionsWrite = new List<Indicator>();
        }
    }
}
