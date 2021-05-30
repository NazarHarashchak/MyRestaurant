using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SiteBackend.Interfaces;
using SiteBackend.DTO;

namespace SiteBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderService service;
        ApplicationContext context;
        public OrderController(ApplicationContext context, IOrderService service)
        {
            this.service = service;
            this.context = context;
        }
        [HttpGet]
        [Route("getuserorders/{id}")]
        public IActionResult GetOrdersForUser(int id)
        {
            OrderListResult result = new OrderListResult();
            try
            {
                result.Success = true;
                result.Items = service.GetUserOders(id);
            }
            catch(Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("getorders")]
        public IActionResult GetOrders()
        {
            OrderListResult result = new OrderListResult();
            try
            {
                result.Success = true;
                result.Items = service.GetManagerOders();
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("discardorder/{id}")]
        public IActionResult DiscardOrders(int id)
        {
            OrderListResult result = new OrderListResult();
            try
            {
                result.Success = true;
                result.Items = service.DiscardOrder(id);
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("getdriverorder/{id}")]
        public IActionResult GetDriverOrder(int id)
        {
            OrderListResult result = new OrderListResult();
            try
            {
                result.Success = true;
                result.Items = service.GetDriverOders(id);
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddOrder([FromBody] AddOrderDTO order)
        {
            Result result = new Result();
            try
            {
                result.Success = service.AddOrder(order);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }
    }
}
