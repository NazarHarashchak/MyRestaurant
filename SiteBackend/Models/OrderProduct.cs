using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class OrderProduct
    {
        public int ? OrdersID { get; set; }
        public Order Order { get; set; }
        public int ? ProductsID { get; set; }
        public Product Product { get; set; }
        public int Count { get; set; }
    }
}
