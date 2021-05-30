using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Constants
{
    public enum OrderStatusesEnum
    {
        Created = 1,
        Preparing,
        Active,
        Completed,
        Discarded
    }
    public enum UserRoleEnum
    {
        Administrator = 1,
        Manager,
        Driver,
        Customer
    }
    public enum WorkerRoleEnum
    {
        Manager = 1, 
        Driver
    }
}
