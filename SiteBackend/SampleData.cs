using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.Models;
using SiteBackend.Constants;

namespace SiteBackend
{
    public class SampleData
    {
        public static void Initialize(ApplicationContext context)
        {
            try
            {
                if (!context.OrderStatuses.Any())
                {
                    context.OrderStatuses.AddRange(
                        new OrderStatus()
                        {
                            ID = (int)OrderStatusesEnum.Created,
                            Status = "Створено"
                        },
                        new OrderStatus()
                        {
                            ID = (int)OrderStatusesEnum.Preparing,
                            Status = "Готується"
                        },
                        new OrderStatus()
                        {
                            ID = (int)OrderStatusesEnum.Active,
                            Status = "В дорозі"
                        },
                        new OrderStatus()
                        {
                            ID = (int)OrderStatusesEnum.Completed,
                            Status = "Завершено"
                        },
                        new OrderStatus()
                        {
                            ID = (int)OrderStatusesEnum.Discarded,
                            Status = "Скасовано"
                        });

                    context.SaveChanges();
                }
                if (!context.UserRoles.Any())
                {
                    context.UserRoles.AddRange(
                        new UserRole()
                        {
                            ID = (int)UserRoleEnum.Administrator,
                            Role = "Адміністратор"
                        },
                        new UserRole()
                        {
                            ID = (int)UserRoleEnum.Manager,
                            Role = "Менеджер доставки"
                        },
                        new UserRole()
                        {
                            ID = (int)UserRoleEnum.Driver,
                            Role = "Кур'єр"
                        },
                        new UserRole()
                        {
                            ID = (int)UserRoleEnum.Customer,
                            Role = "Замовник"
                        });

                    context.SaveChanges();
                }
                if (!context.WorkerRoles.Any())
                {
                    context.WorkerRoles.AddRange(
                        new WorkerRole() { 
                            ID = (int)WorkerRoleEnum.Manager,
                            Role = "Менеджер доставки"
                        },
                        new WorkerRole()
                        {
                            ID = (int)WorkerRoleEnum.Driver,
                            Role = "Водій"
                        });

                    context.SaveChanges();
                }
                if (!context.Users.Any())
                {
                    User user1 = new User()
                    {
                        IsActive = true,
                        Login = "testuser1@test.com",
                        Password = "1234567890",
                        UserRole = context.UserRoles.Where(role => role.ID == (int)UserRoleEnum.Administrator).FirstOrDefault()
                    };
                    UserInformation userInformation1 = new UserInformation()
                    {
                        Name = "Михайло",
                        SecondName = "Федай",
                        Age = 21,
                        City = "Львів",
                        PhoneNumber = "+380999999999",
                        Street = "Кульчицької",
                        HouseNumber = "13",
                        IsPrivateHouse = false,
                        AppartmentsNumber = 17,
                        User = user1
                    };
                    user1.UserInformation = userInformation1;

                    context.Users.Add(user1);
                    context.UserInformations.Add(userInformation1);

                    User user2 = new User()
                    {
                        IsActive = true,
                        Login = "testuser2@test.com",
                        Password = "1234567890",
                        UserRole = context.UserRoles.Where(role => role.ID == (int)UserRoleEnum.Manager).FirstOrDefault()
                    };
                    UserInformation userInformation2 = new UserInformation()
                    {
                        Name = "Христина",
                        SecondName = "Підгорна",
                        Age = 21,
                        City = "Львів",
                        PhoneNumber = "+380999999999",
                        Street = "Личаківська",
                        HouseNumber = "17",
                        IsPrivateHouse = false,
                        AppartmentsNumber = 17,
                        User = user2
                    };
                    Worker worker1 = new Worker()
                    {
                        DriverInformation = null,
                        User = user2,
                        WorkerRole = context.WorkerRoles.Where(role => role.ID == (int)WorkerRoleEnum.Manager).FirstOrDefault(),
                        HiringDay = DateTime.Now
                    };
                    user2.UserInformation = userInformation2;
                    user2.Worker = worker1;

                    context.Users.Add(user2);
                    context.UserInformations.Add(userInformation2);
                    context.Workers.Add(worker1);

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
