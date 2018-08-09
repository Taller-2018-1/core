using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class Role
    {
        public long RoleID { get; set; }
        public string RoleName { get; set; }
        public string RoleToken { get; set; }
        public ICollection<Indicator> PermissionsRead { get; set; }
        public ICollection<Indicator> PermissionsWrite { get; set; }

        public Role()
        {
            this.PermissionsRead = new List<Indicator>();
            this.PermissionsWrite = new List<Indicator>();
        }
    }
}
