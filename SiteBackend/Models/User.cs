using System;
using System.Collections.Generic;
namespace SiteBackend.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public int ? UserRoleID { get; set; }
        public UserRole UserRole { get; set; }
        public UserInformation UserInformation { get; set; }
        public Customer Customer { get; set; }
        public Worker Worker { get; set; }
        public User()
        {
        }
    }
}
