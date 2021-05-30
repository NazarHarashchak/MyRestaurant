using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class DriverInformation
    {
        public int ID { get; set; }
        public int ? WorkerID { get; set; }
        public Worker Worker { get; set; }
        public string CarName { get; set; }
        public string CarColor { get; set; }
        public string CarNumber { get; set; }
        public List<Order> Orders { get; set; }
        public DriverInformation()
        {
            Orders = new List<Order>();
        }
    }
}
