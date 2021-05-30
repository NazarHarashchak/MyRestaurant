using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.Interfaces;
using SiteBackend.DTO;
using SiteBackend.Models;
using SiteBackend.Constants;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace SiteBackend.Services
{
    public class UserService : IUserService
    {
        ApplicationContext context;
        public UserService(ApplicationContext context)
        {
            this.context = context;
        }
        public List<UserDTO> GetAllUsers(int userID)
        {
            var admin = context.Users.Include(item => item.UserRole).Where(item => item.ID == userID).FirstOrDefault();
            if (admin == null || admin.UserRole.ID != (int)UserRoleEnum.Administrator)
            {
                throw new KeyNotFoundException();
            }

            var users = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation)
                                     .Include(item => item.Worker).Include(item => item.Customer).ToList();
            List<UserDTO> result = new List<UserDTO>();

            foreach(var user in users)
            {
                result.Add(new UserDTO() { 
                    ID = user.ID,
                    Email = user.Login,
                    Name = user.UserInformation != null ? user.UserInformation.Name : "",
                    SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                    UserRole = user.UserRole.Role,
                    RoleID = user.UserRole.ID,
                    Age = user.UserInformation != null ? user.UserInformation.Age : 0,
                    Image = user.UserInformation != null ? user.UserInformation?.Image : null,
                    PhoneNumber = user.UserInformation != null ? user.UserInformation.PhoneNumber : "",
                    City = user.UserInformation != null ? user.UserInformation.City : "",
                    Street = user.UserInformation != null ? user.UserInformation.Street : "",
                    HouseNumber = user.UserInformation != null ? user.UserInformation.HouseNumber : "",
                    AppartmentsNumber = user.UserInformation != null ? user.UserInformation.AppartmentsNumber : 0,
                    IsPrivateHouse = user.UserInformation != null ? user.UserInformation.IsPrivateHouse : false,
                    IsActive = user.IsActive
                });
            }

            return result;
        }
        public UserDTO GetUser(int userID)
        {
            var user = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation).Include(item => item.Worker)
                                    .Include(item => item.Customer).Where(item => item.ID == userID).FirstOrDefault();

            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            var result = new UserDTO()
            {
                ID = user.ID,
                Email = user.Login,
                Name = user.UserInformation != null ? user.UserInformation.Name : "",
                SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                UserRole = user.UserRole.Role,
                RoleID = user.UserRole.ID,
                Age = user.UserInformation != null ? user.UserInformation.Age : 0,
                PhoneNumber = user.UserInformation != null ? user.UserInformation.PhoneNumber : "",
                Image = user.UserInformation != null ? user.UserInformation?.Image : null,
                City = user.UserInformation != null ? user.UserInformation.City : "",
                Street = user.UserInformation != null ? user.UserInformation.Street : "",
                HouseNumber = user.UserInformation != null ? user.UserInformation.HouseNumber : "",
                AppartmentsNumber = user.UserInformation != null ? user.UserInformation.AppartmentsNumber : 0,
                IsPrivateHouse = user.UserInformation != null ? user.UserInformation.IsPrivateHouse : false,
                IsActive = user.IsActive
            };

            return result;
        }

        public UserDTO SaveUser(UserDTO user)
        {
            var userDB = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation).Include(item => item.Worker)
                                    .Include(item => item.Customer).Where(item => item.ID == user.ID).FirstOrDefault();
            
            if (userDB.UserInformation == null)
            {
                UserInformation userInformation = new UserInformation() { 
                    Name = user.Name,
                    SecondName = user.SecondName,
                    City = user.City,
                    Street = user.Street,
                    HouseNumber = user.HouseNumber,
                    IsPrivateHouse = user.IsPrivateHouse,
                    AppartmentsNumber = user.AppartmentsNumber,
                    Age = user.Age,
                    PhoneNumber = user.PhoneNumber,
                    Image = user.Image
                };

                context.UserInformations.Add(userInformation);
                userDB.UserInformation = userInformation;
            }
            else
            {
                UserInformation userInformation = context.UserInformations.Where(item => item.ID == userDB.UserInformation.ID).FirstOrDefault();
                userInformation.Name = user.Name;
                userInformation.SecondName = user.SecondName;
                userInformation.City = user.City;
                userInformation.Street = user.Street;
                userInformation.HouseNumber = user.HouseNumber;
                userInformation.IsPrivateHouse = user.IsPrivateHouse;
                userInformation.AppartmentsNumber = user.AppartmentsNumber;
                userInformation.Age = user.Age;
                userInformation.PhoneNumber = user.PhoneNumber;
                userInformation.Image = user.Image;

                context.UserInformations.Update(userInformation);
            }

            userDB.IsActive = true;

            context.Users.Update(userDB);
            context.SaveChanges();
            return user;
        }

        public List<UserDTO> BlockUser(int userID)
        {
            var userDB = context.Users.Where(item => item.ID == userID).FirstOrDefault();

            if (userDB == null)
            {
                throw new KeyNotFoundException();
            }

            userDB.IsActive = !userDB.IsActive;
            context.Update(userDB);
            context.SaveChanges();

            var users = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation)
                                    .Include(item => item.Worker).Include(item => item.Customer).ToList();
            List<UserDTO> result = new List<UserDTO>();

            foreach (var user in users)
            {
                result.Add(new UserDTO()
                {
                    ID = user.ID,
                    Email = user.Login,
                    Name = user.UserInformation != null ? user.UserInformation.Name : "",
                    SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                    UserRole = user.UserRole.Role,
                    RoleID = user.UserRole.ID,
                    Age = user.UserInformation != null ? user.UserInformation.Age : 0,
                    Image = user.UserInformation != null ? user.UserInformation?.Image : null,
                    PhoneNumber = user.UserInformation != null ? user.UserInformation.PhoneNumber : "",
                    City = user.UserInformation != null ? user.UserInformation.City : "",
                    Street = user.UserInformation != null ? user.UserInformation.Street : "",
                    HouseNumber = user.UserInformation != null ? user.UserInformation.HouseNumber : "",
                    AppartmentsNumber = user.UserInformation != null ? user.UserInformation.AppartmentsNumber : 0,
                    IsPrivateHouse = user.UserInformation != null ? user.UserInformation.IsPrivateHouse : false,
                    IsActive = user.IsActive
                });
            }

            return result;
        }

        public List<UserDTO> AdminUpdateUser(UserDTO userDTO)
        {
            var userDB = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation)
                                    .Include(item => item.Worker).Include(item => item.Customer)
                                    .Where(item => item.ID == userDTO.ID).FirstOrDefault();

            if (userDB == null)
            {
                throw new NullReferenceException();
            }

            userDB.UserInformation.Name = userDTO.Name;
            userDB.UserInformation.SecondName = userDTO.SecondName;
            userDB.UserInformation.Age = userDTO.Age;
            userDB.UserInformation.PhoneNumber = userDTO.PhoneNumber;
            userDB.UserInformation.City = userDTO.City;
            userDB.UserInformation.Street = userDTO.Street;
            userDB.UserInformation.HouseNumber = userDTO.HouseNumber;
            userDB.UserInformation.IsPrivateHouse = userDTO.IsPrivateHouse;
            userDB.UserInformation.AppartmentsNumber = userDTO.AppartmentsNumber;
            userDB.UserRole = context.UserRoles.Where(item => item.ID == userDTO.RoleID).FirstOrDefault();
            userDB.IsActive = true;

            context.Users.Update(userDB);
            context.SaveChanges();

            var users = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation)
                                    .Include(item => item.Worker).Include(item => item.Customer).ToList();
            List<UserDTO> result = new List<UserDTO>();

            foreach (var user in users)
            {
                result.Add(new UserDTO()
                {
                    ID = user.ID,
                    Email = user.Login,
                    Name = user.UserInformation != null ? user.UserInformation.Name : "",
                    SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                    UserRole = user.UserRole.Role,
                    RoleID = user.UserRole.ID,
                    Age = user.UserInformation != null ? user.UserInformation.Age : 0,
                    Image = user.UserInformation != null ? user.UserInformation?.Image : null,
                    PhoneNumber = user.UserInformation != null ? user.UserInformation.PhoneNumber : "",
                    City = user.UserInformation != null ? user.UserInformation.City : "",
                    Street = user.UserInformation != null ? user.UserInformation.Street : "",
                    HouseNumber = user.UserInformation != null ? user.UserInformation.HouseNumber : "",
                    AppartmentsNumber = user.UserInformation != null ? user.UserInformation.AppartmentsNumber : 0,
                    IsPrivateHouse = user.UserInformation != null ? user.UserInformation.IsPrivateHouse : false,
                    IsActive = user.IsActive
                });
            }

            return result;
        }
        public List<UserDTO> AdminAddUser(AdminUserDTO userDTO)
        {
            var userDB = new User();

            userDB.Login = userDTO.Email;
            userDB.Password = userDTO.Password;
            userDB.IsActive = true;
            userDB.UserRole = context.UserRoles.Where(item => item.ID == userDTO.RoleID).FirstOrDefault();

            UserInformation userInformation = new UserInformation()
            {
                Name = userDTO.Name,
                SecondName = userDTO.SecondName,
                Age = userDTO.Age,
                PhoneNumber = userDTO.PhoneNumber,
                City = userDTO.City,
                Street = userDTO.Street,
                HouseNumber = userDTO.HouseNumber,
                IsPrivateHouse = userDTO.IsPrivateHouse,
                AppartmentsNumber = userDTO.AppartmentsNumber
            };
            context.UserInformations.Add(userInformation);
            userDB.UserInformation = userInformation;

            context.Users.Add(userDB);
            context.SaveChanges();

            var users = context.Users.Include(item => item.UserRole).Include(item => item.UserInformation)
                                    .Include(item => item.Worker).Include(item => item.Customer).ToList();
            List<UserDTO> result = new List<UserDTO>();

            foreach (var user in users)
            {
                result.Add(new UserDTO()
                {
                    ID = user.ID,
                    Email = user.Login,
                    Name = user.UserInformation != null ? user.UserInformation.Name : "",
                    SecondName = user.UserInformation != null ? user.UserInformation.SecondName : "",
                    UserRole = user.UserRole.Role,
                    RoleID = user.UserRole.ID,
                    Age = user.UserInformation != null ? user.UserInformation.Age : 0,
                    Image = user.UserInformation != null ? user.UserInformation?.Image : null,
                    PhoneNumber = user.UserInformation != null ? user.UserInformation.PhoneNumber : "",
                    City = user.UserInformation != null ? user.UserInformation.City : "",
                    Street = user.UserInformation != null ? user.UserInformation.Street : "",
                    HouseNumber = user.UserInformation != null ? user.UserInformation.HouseNumber : "",
                    AppartmentsNumber = user.UserInformation != null ? user.UserInformation.AppartmentsNumber : 0,
                    IsPrivateHouse = user.UserInformation != null ? user.UserInformation.IsPrivateHouse : false,
                    IsActive = user.IsActive
                });
            }

            return result;
        }
    }
}
