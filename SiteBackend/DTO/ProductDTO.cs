using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class ProductDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Weight { get; set; }
        public string ProductContent { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public int ProductTypeID { get; set; }
        public string ProductType { get; set; }
        public int Count { get; set; }
    }
}
