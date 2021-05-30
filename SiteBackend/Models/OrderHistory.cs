using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Models
{
    public class OrderHistory
    {
        public int ID { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ? OrderID { get; set; }
        public Order Order { get; set; }
        public int ? PreviousStatusID { get; set; }
        [ForeignKey("PreviousStatusID")]
        public OrderStatus PreviousStatus { get; set; }
        public int ? CurrentStatusID { get; set; }
        [ForeignKey("CurrentStatusID")]
        public OrderStatus CurrentStatus { get; set; }
        public int ? UserID { get; set; }
        public User ChangedByUser { get; set; }
    }
}
