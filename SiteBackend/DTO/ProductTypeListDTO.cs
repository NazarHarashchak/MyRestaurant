using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class ProductTypeListDTO : Result
    {
        public List<ProductTypeDTO> Items { get; set; }
    }
}
