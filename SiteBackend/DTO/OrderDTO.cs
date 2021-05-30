using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class OrderDTO
    {
        public int ID { get; set; }
        public string Status { get; set; }
        public List<ProductDTO> Products {get;set;}
        public double Price { get; set; }
        public string CreatedDate { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string FullAddress { get; set; }
    }
}
