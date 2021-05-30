using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class Customer
    {
        public int ID { get; set; }
        public int DiscountPercent { get; set; }
        public int ? UserID { get; set; }
        public User User { get; set; }
        public List<Order> Orders { get; set; }
        public Customer()
        {
            Orders = new List<Order>();
        }
    }
}
