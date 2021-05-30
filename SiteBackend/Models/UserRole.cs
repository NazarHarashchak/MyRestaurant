using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SiteBackend.Models
{
    public class UserRole
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string Role { get; set; }
    }
}
