using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class ProductType
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
    }
}
