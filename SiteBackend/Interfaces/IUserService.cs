using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.DTO;

namespace SiteBackend.Interfaces
{
    public interface IUserService
    {
        public List<UserDTO> GetAllUsers(int userID);
        public UserDTO GetUser(int userID);
        public UserDTO SaveUser(UserDTO user);
        public List<UserDTO> BlockUser(int userID);
        public List<UserDTO> AdminUpdateUser(UserDTO user);
        public List<UserDTO> AdminAddUser(AdminUserDTO user);
    }
}
