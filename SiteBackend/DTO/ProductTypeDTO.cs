using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class ProductTypeDTO
    {
        public int ID { get; set;}
        public string Name { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
    }
}
