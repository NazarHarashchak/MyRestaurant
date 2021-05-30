using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.Interfaces;
using SiteBackend.DTO;
using SiteBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace SiteBackend.Services
{
    public class OrderService : IOrderService
    {
        ApplicationContext context;
        public OrderService(ApplicationContext context)
        {
            this.context = context;
        }

        public bool AddOrder(AddOrderDTO orderDTO)
        {
            Order order = new Order();
            order.City = orderDTO.City;
            order.Street = orderDTO.Street;
            order.HouseNumber = orderDTO.HouseNumber;
            order.IsPrivateHouse = orderDTO.IsPrivate;
            order.AppartmentsNumber = orderDTO.AppartmentsNumber;
            order.CreatedDate = DateTime.Now;
            order.Products = new List<Product>();
            order.Customer = context.Users.Where(item => item.ID == orderDTO.CustomerID).FirstOrDefault()?.Customer;
            var status = context.OrderStatuses.Where(item => item.ID == (int)SiteBackend.Constants.OrderStatusesEnum.Created).FirstOrDefault();
            order.OrderStatus = status;

            order.OrderProducts = new List<OrderProduct>();

            foreach(var product in orderDTO.Products)
            {
                var productDB = context.Products.Where(item => item.ID == product.ID).FirstOrDefault();
                OrderProduct orderProduct = new OrderProduct()
                {
                    Product = productDB,
                    Order = order,
                    Count = product.Count
                };
                order.OrderProducts.Add(orderProduct);
                context.OrderProducts.Add(orderProduct);
            }

            OrderHistory history = new OrderHistory();
            history.Order = order;
            history.PreviousStatus = null;
            history.CurrentStatus = status;
            history.ChangedByUser = context.Users.Where(item => item.ID == orderDTO.CustomerID).FirstOrDefault();
            history.ModifiedDate = DateTime.Now;

            context.Orders.Add(order);
            context.OrderHistories.Add(history);

            context.SaveChanges();

            return true;
        }
        public List<OrderDTO> GetUserOders(int userID)
        {
            var user = context.Users.Include(item => item.Customer).Where(item => item.ID == userID).FirstOrDefault();
            if (user == null || user.Customer == null)
            {
                throw new NullReferenceException();
            }

            var ordersDB = context.Orders.Include(item => item.OrderStatus).Include(item => item.OrderProducts).Include(item => item.Products).Include(item => item.Customer)
                .Where(item => item.Customer.ID == user.Customer.ID).OrderBy(item => item.OrderStatus.ID).ToList();
            List<OrderDTO> orders = new List<OrderDTO>();
            foreach(var order in ordersDB)
            {
                List<ProductDTO> products = new List<ProductDTO>();
                double price = 0;
                foreach(var product in order.Products)
                {
                    var prodCount = product.OrderProducts.Where(item => item.ProductsID == product.ID)
                                    .Where(item => item.OrdersID == order.ID).FirstOrDefault();
                    products.Add(new ProductDTO()
                    {
                        ID = product.ID,
                        Name = product.Name,
                        Price = product.Price,
                        ProductContent = product.ProductContent,
                        ProductType = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().Type,
                        ProductTypeID = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().ID,
                        Weight = product.Weight,
                        Image = product.Image,
                        IsActive = product.IsActive,
                        Count = prodCount != null ? prodCount.Count : 1
                    });
                    price += product.Price;
                }
                orders.Add(new OrderDTO()
                {
                    ID = order.ID,
                    Products = products,
                    Status = order.OrderStatus.Status,
                    Price = price,
                    CreatedDate = order.CreatedDate.ToShortDateString()
                });
            }
            return orders;
        }

        public List<OrderDTO> GetManagerOders()
        {
            var ordersDB = context.Orders.Include(item => item.OrderStatus)
                .Include(item => item.OrderProducts).Include(item => item.Products).Include(item => item.Customer)
                .OrderBy(item => item.OrderStatus.ID).ToList();
            List<OrderDTO> orders = new List<OrderDTO>();
            foreach (var order in ordersDB)
            {
                List<ProductDTO> products = new List<ProductDTO>();
                double price = 0;
                foreach (var product in order.Products)
                {
                    var prodCount = product.OrderProducts.Where(item => item.ProductsID == product.ID)
                                    .Where(item => item.OrdersID == order.ID).FirstOrDefault();
                    products.Add(new ProductDTO()
                    {
                        ID = product.ID,
                        Name = product.Name,
                        Price = product.Price,
                        ProductContent = product.ProductContent,
                        ProductType = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().Type,
                        ProductTypeID = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().ID,
                        Weight = product.Weight,
                        Image = product.Image,
                        IsActive = product.IsActive,
                        Count = prodCount != null ? prodCount.Count : 1
                    });
                    price += product.Price;
                }
                var user = context.Users.Where(item => item.Customer.ID == order.Customer.ID).Include(item => item.UserInformation).FirstOrDefault();
                orders.Add(new OrderDTO()
                {
                    ID = order.ID,
                    Products = products,
                    Status = order.OrderStatus.Status,
                    Price = price,
                    CreatedDate = order.CreatedDate.ToShortDateString(),
                    Name = user.UserInformation.Name,
                    SecondName = user.UserInformation.SecondName,
                    FullAddress = string.Format("{0}, {1}, {2}", order.City, order.Street, order.HouseNumber)
                });
            }
            return orders;
        }
        public List<OrderDTO> DiscardOrder(int id)
        {
            var orderDB = context.Orders.Where(item => item.ID == id).Include(item => item.OrderHistories).FirstOrDefault();

            orderDB.OrderStatus = context.OrderStatuses.Where(item => item.ID == (int)SiteBackend.Constants.OrderStatusesEnum.Discarded).FirstOrDefault();
            context.Orders.Update(orderDB);
            context.SaveChanges();

            var ordersDB = context.Orders.Include(item => item.OrderStatus)
                .Include(item => item.OrderProducts).Include(item => item.Products).Include(item => item.Customer)
                .OrderBy(item => item.OrderStatus.ID).ToList();
            List<OrderDTO> orders = new List<OrderDTO>();
            foreach (var order in ordersDB)
            {
                List<ProductDTO> products = new List<ProductDTO>();
                double price = 0;
                foreach (var product in order.Products)
                {
                    var prodCount = product.OrderProducts.Where(item => item.ProductsID == product.ID)
                                    .Where(item => item.OrdersID == order.ID).FirstOrDefault();
                    products.Add(new ProductDTO()
                    {
                        ID = product.ID,
                        Name = product.Name,
                        Price = product.Price,
                        ProductContent = product.ProductContent,
                        ProductType = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().Type,
                        ProductTypeID = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().ID,
                        Weight = product.Weight,
                        Image = product.Image,
                        IsActive = product.IsActive,
                        Count = prodCount != null ? prodCount.Count : 1
                    });
                    price += product.Price;
                }
                var user = context.Users.Where(item => item.Customer.ID == order.Customer.ID).Include(item => item.UserInformation).FirstOrDefault();
                orders.Add(new OrderDTO()
                {
                    ID = order.ID,
                    Products = products,
                    Status = order.OrderStatus.Status,
                    Price = price,
                    CreatedDate = order.CreatedDate.ToShortDateString(),
                    Name = user.UserInformation.Name,
                    SecondName = user.UserInformation.SecondName,
                    FullAddress = string.Format("{0}, {1}, {2}", order.City, order.Street, order.HouseNumber)
                });
            }
            return orders;
        }
        public List<AddOrderDTO> SetDriversToOders(DriverOrderDTO driver)
        {
            var orderDB = context.Orders.Where(item => item.ID == driver.OrderID).FirstOrDefault();
            var driverDB = context.DriverInformations.Where(item => item.ID == driver.DriverID).FirstOrDefault();
            orderDB.DriverInformation = driverDB;
            orderDB.OrderStatus = context.OrderStatuses.Where(item => item.ID == (int)SiteBackend.Constants.OrderStatusesEnum.Active).FirstOrDefault();

            context.Orders.Update(orderDB);
            context.SaveChanges();

            var ordersDB = context.Orders.Include(item => item.OrderStatus).Include(item => item.Products).Include(item => item.Customer)
                           .OrderBy(item => item.OrderStatus.ID).ToList();
            List<AddOrderDTO> orders = new List<AddOrderDTO>();
            foreach (var order in ordersDB)
            {
                List<ProductDTO> products = new List<ProductDTO>();
                foreach (var product in order.Products)
                {
                    products.Add(new ProductDTO()
                    {
                        ID = product.ID,
                        Name = product.Name,
                        Price = product.Price,
                        ProductContent = product.ProductContent,
                        ProductType = product.ProductType.Type,
                        ProductTypeID = product.ProductType.ID,
                        Weight = product.Weight,
                        Image = product.Image,
                        IsActive = product.IsActive
                    });
                }
                orders.Add(new AddOrderDTO()
                {
                    ID = order.ID,
                    Products = products,
                    Status = order.OrderStatus.Status
                });
            }
            return orders;
        }
        public List<OrderDTO> GetDriverOders(int userID)
        {
            var userDB = context.Users.Where(item => item.ID == userID).Include(item => item.Worker).Include(item => item.Worker.DriverInformation).FirstOrDefault();
            if (userDB.Worker.DriverInformation == null)
            {
                throw new NullReferenceException();
            }
            var ordersDB = context.Orders.Include(item => item.OrderStatus).Include(item => item.Products).Include(item => item.Customer)
                           .Where(item => item.DriverInformation.ID == userDB.Worker.DriverInformation.ID).ToList();
            List<OrderDTO> orders = new List<OrderDTO>();
            foreach (var order in ordersDB)
            {
                List<ProductDTO> products = new List<ProductDTO>();
                double price = 0;
                foreach (var product in order.Products)
                {
                    var prodCount = product.OrderProducts.Where(item => item.ProductsID == product.ID)
                                    .Where(item => item.OrdersID == order.ID).FirstOrDefault();
                    products.Add(new ProductDTO()
                    {
                        ID = product.ID,
                        Name = product.Name,
                        Price = product.Price,
                        ProductContent = product.ProductContent,
                        ProductType = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().Type,
                        ProductTypeID = context.ProductTypes.Where(item => item.ID == product.ProductTypeID).FirstOrDefault().ID,
                        Weight = product.Weight,
                        Image = product.Image,
                        IsActive = product.IsActive,
                        Count = prodCount != null ? prodCount.Count : 1
                    });
                    price += product.Price;
                }
                var user = context.Users.Where(item => item.Customer.ID == order.Customer.ID).Include(item => item.UserInformation).FirstOrDefault();
                orders.Add(new OrderDTO()
                {
                    ID = order.ID,
                    Products = products,
                    Status = order.OrderStatus.Status,
                    Price = price,
                    CreatedDate = order.CreatedDate.ToShortDateString(),
                    Name = user.UserInformation.Name,
                    SecondName = user.UserInformation.SecondName,
                    FullAddress = string.Format("{0}, {1}, {2}", order.City, order.Street, order.HouseNumber)
                });
            }
            return orders;
        }
    }
}
