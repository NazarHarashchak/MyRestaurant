using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class Worker
    {
        public int ID { get; set; }
        public int ? UserID { get; set; }
        public User User { get; set; }
        public DateTime HiringDay { get; set; }
        public int ? WorkerRoleID { get; set; }
        public WorkerRole WorkerRole { get; set; }
        public DriverInformation DriverInformation { get; set; }
    }
}
