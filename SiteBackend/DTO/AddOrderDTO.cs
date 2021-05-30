using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class AddOrderDTO
    {
        public int ID { get; set; }
        public List<ProductDTO> Products { get; set; }
        public double Price { get; set; }
        public int PaymentType { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public bool IsPrivate { get; set; }
        public int AppartmentsNumber { get; set; }
        public string Message { get; set; }
        public int CustomerID { get; set; }
        public string Status { get; set; }
    }
}
