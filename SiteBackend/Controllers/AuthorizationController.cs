using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SiteBackend.DTO;
using SiteBackend.Interfaces;

namespace SiteBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        IAuthorizationService authorizationService;
        public AuthorizationController(IAuthorizationService authorization)
        {
            this.authorizationService = authorization;
        }
        [Route("authorizate")]
        [HttpPost]
        public IActionResult Authorizate([FromBody] AuthorizationDTO body)
        {
            UserDTO user = new UserDTO();
            var result = new
            {
                Success = true,
                Message = "",
                Item = user
            };
            try
            {
                user = authorizationService.Authorizate(body.Email, body.Password);
                result = new
                {
                    Success = true,
                    Message = "",
                    Item = user
                };
            }
            catch (Exception ex)
            {
                result = new
                {
                    Success = false,
                    Message = ex.Message,
                    Item = user
                };
            }
            return Ok(result);
        }

        [Route("registrate")]
        [HttpPost]
        public IActionResult Registrate([FromBody] AuthorizationDTO body)
        {
            UserDTO user = new UserDTO();
            var result = new
            {
                Success = true,
                Message = "",
                Item = user
            };
            try
            {
                user = authorizationService.Registrate(body.Email, body.Password);
                result = new
                {
                    Success = true,
                    Message = "",
                    Item = user
                };
            }
            catch(KeyNotFoundException ex)
            {
                result = new
                {
                    Success = false,
                    Message = "Користувач з такою електронною адресою вже існує",
                    Item = user
                };
            }
            catch (Exception ex)
            {
                result = new
                {
                    Success = false,
                    Message = ex.Message,
                    Item = user
                };
            }
            return Ok(result);
        }
    }
}
