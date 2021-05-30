using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.Interfaces;
using SiteBackend.DTO;
using Microsoft.EntityFrameworkCore;
using SiteBackend.Constants;
using SiteBackend.Models;

namespace SiteBackend.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        ApplicationContext context;
        public AuthorizationService(ApplicationContext context)
        {
            this.context = context;
        }
        public UserDTO Authorizate(string email, string password)
        {
            var user = context.Users.Where(item => item.Login.ToLower() == email.ToLower().Trim()).Where(item => item.Password == password)
                        .Include(item => item.UserInformation).Include(item => item.UserRole)
                        .Include(item => item.Worker).FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            UserDTO userDTO = new UserDTO() { 
                ID = user.ID,
                Email = user.Login,
                Name = user.UserInformation != null ? user.UserInformation.Name : "",
                SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                RoleID = user.UserRole.ID
            };
            return userDTO;
        }
        public UserDTO Registrate(string email, string password)
        {
            var user = context.Users.Where(item => item.Login.ToLower() == email.ToLower().Trim()).FirstOrDefault();
            if (user != null)
            {
                throw new KeyNotFoundException();
            }

            user = new User();
            user.Login = email.Trim();
            user.Password = password;
            user.UserRole = context.UserRoles.Where(item => item.ID == (int)UserRoleEnum.Customer).FirstOrDefault();
            context.Users.Add(user);

            Customer customer = new Customer();
            customer.User = user;
            customer.DiscountPercent = 0;

            context.Customers.Add(customer);
            context.SaveChanges();

            UserDTO userDTO = new UserDTO()
            {
                ID = user.ID,
                Email = user.Login,
                RoleID = user.UserRole.ID
            };
            return userDTO;
        }
    }
}
