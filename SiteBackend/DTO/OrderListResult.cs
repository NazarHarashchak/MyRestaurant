using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.DTO
{
    public class OrderListResult : Result
    {
        public List<OrderDTO> Items { get; set; }
    }
}
