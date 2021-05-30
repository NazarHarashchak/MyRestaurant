using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class Order
    {
        public int ID { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime FinishedDate { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public bool IsPrivateHouse { get; set; }
        public int AppartmentsNumber { get; set; }
        public int ? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int ? OrderStatusID { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public int ? DriverInformationID { get; set; }
        public DriverInformation DriverInformation { get; set; }
        public List<Product> Products { get; set; }
        public List<OrderHistory> OrderHistories { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public Order()
        {
            Products = new List<Product>();
            OrderHistories = new List<OrderHistory>();
            OrderProducts = new List<OrderProduct>();
        }
    }
}
