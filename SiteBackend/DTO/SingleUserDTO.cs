using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class SingleUserDTO : Result
    {
        public UserDTO Item { get; set; }
    }
}
