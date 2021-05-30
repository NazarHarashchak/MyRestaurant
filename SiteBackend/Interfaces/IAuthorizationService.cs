using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.DTO;

namespace SiteBackend.Interfaces
{
    public interface IAuthorizationService
    {
        public UserDTO Authorizate(string email, string password);
        public UserDTO Registrate(string email, string password);
    }
}
