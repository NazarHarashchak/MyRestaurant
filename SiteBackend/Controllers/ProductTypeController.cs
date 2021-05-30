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
    public class ProductTypeController : ControllerBase
    {
        ApplicationContext context;
        IProductTypeService service;
        public ProductTypeController(ApplicationContext context, IProductTypeService service)
        {
            this.context = context;
            this.service = service;
        }

        [HttpGet]
        [Route("getallcategories")]
        public IActionResult GetAllCategories()
        {
            var result = new ProductTypeListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.GetAllProductTypes();
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
        [Route("getactivecategories")]
        public IActionResult GetAllActiveCategories()
        {
            var result = new ProductTypeListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.GetAllActiveCategories();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("block/{id}")]
        public IActionResult BlockCategory(int id)
        {
            var result = new ProductTypeListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.BlockProductType(id);
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

        [HttpPost]
        [Route("addnewcategory")]
        public IActionResult AddCategory([FromBody] ProductTypeDTO typeDTO)
        {
            var result = new ProductTypeListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.AddProductType(typeDTO);
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

        [HttpPut]
        [Route("updatecategory")]
        public IActionResult UpdateCategory([FromBody] ProductTypeDTO typeDTO)
        {
            var result = new ProductTypeListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.UpdateProductType(typeDTO);
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
    }
}
