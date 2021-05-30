using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Weight { get; set; }
        public string ProductContent { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public int? ProductTypeID { get; set; }
        public ProductType ProductType { get; set; }
        public List<Order> Orders { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public Product()
        {
            Orders = new List<Order>();
            OrderProducts = new List<OrderProduct>();
        }
    }
}
