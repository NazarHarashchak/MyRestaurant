using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class ProductListDTO : Result
    {
        public List<ProductDTO> Items { get; set; }
    }
}
