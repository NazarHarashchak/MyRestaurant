using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class UserListResponseDTO : Result
    {
        public List<UserDTO> Items { get; set; }
        public UserListResponseDTO()
        {
            Items = new List<UserDTO>();
        }
    }
}
