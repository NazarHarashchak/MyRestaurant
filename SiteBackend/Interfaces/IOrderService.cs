using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.DTO;

namespace SiteBackend.Interfaces
{
    public interface IOrderService
    {
        public bool AddOrder(AddOrderDTO order);
        public List<OrderDTO> GetUserOders(int userID);
        public List<OrderDTO> GetManagerOders();
        public List<OrderDTO> DiscardOrder(int id);
        public List<AddOrderDTO> SetDriversToOders(DriverOrderDTO driver);
        public List<OrderDTO> GetDriverOders(int userID);
    }
}
