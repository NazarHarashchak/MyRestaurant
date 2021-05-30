using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class AdminUserDTO : UserDTO
    {
        public string Password { get; set; }
    }
}
