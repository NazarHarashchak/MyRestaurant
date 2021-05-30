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
    public class UserController : ControllerBase
    {
        private ApplicationContext context;
        private IUserService userService;
        public UserController(ApplicationContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        [Route("getallusers/{id}")]
        [HttpGet]
        public IActionResult GetUsers(int id)
        {
            var result = new UserListResponseDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = userService.GetAllUsers(id);
            }
            catch (KeyNotFoundException ex)
            {
                result.Success = false;
                result.Message = "You dont have permissions!";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("getuser/{id}")]
        public IActionResult GetUser(int id)
        {
            SingleUserDTO result = new SingleUserDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Item = userService.GetUser(id);
            }
            catch (KeyNotFoundException ex)
            {
                result.Success = false;
                result.Message = "User not found!";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("saveuser")]
        public IActionResult SaveUser([FromBody] UserDTO user)
        {
            SingleUserDTO result = new SingleUserDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Item = userService.SaveUser(user);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("blockuser/{id}")]
        public IActionResult BlockUser(int id)
        {
            var result = new UserListResponseDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = userService.BlockUser(id);
            }
            catch (KeyNotFoundException ex)
            {
                result.Success = false;
                result.Message = "User not found";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpPut]
        [Route("admin/update")]
        public IActionResult UpdateUser([FromBody] UserDTO user)
        {
            var result = new UserListResponseDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = userService.AdminUpdateUser(user);
            }
            catch (NullReferenceException ex)
            {
                result.Success = false;
                result.Message = "User not found";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("admin/add")]
        public IActionResult AddUser([FromBody] AdminUserDTO user)
        {
            var result = new UserListResponseDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = userService.AdminAddUser(user);
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
