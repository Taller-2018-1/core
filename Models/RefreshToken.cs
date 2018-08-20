using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace think_agro_metrics.Models
{
    public class RefreshToken
    {
        public string RefreshTokenID { get; set; } // User ID
        public string UID { get; set; } // User ID
        public string RefreshTokenString { get; set; } // The refreshToken
        public DateTime ExpirationDate { get; set; } // Expiration date for this token
        public string IP { get; set; } // The last ip used
        public RefreshToken()
        {
        }
    }
}
