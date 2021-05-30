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
    public class ProductController : ControllerBase
    {
        ApplicationContext context;
        IProductService service;
        public ProductController(ApplicationContext context, IProductService service)
        {
            this.context = context;
            this.service = service;
        }

        [HttpGet]
        [Route("getallproducts")]
        public IActionResult GetAllProducts()
        {
            var result = new ProductListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.GetAllProducts();
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
        [Route("getallproducts/{id}")]
        public IActionResult GetAllProductsByCategory(int id)
        {
            var result = new ProductListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.GetProductsByCategory(id);
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
        public IActionResult BlockProduct(int id)
        {
            var result = new ProductListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.BlockProduct(id);
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
        [Route("addnewproduct")]
        public IActionResult AddCategory([FromBody] ProductDTO product)
        {
            var result = new ProductListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.AddProduct(product);
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
        [Route("updateproduct")]
        public IActionResult UpdateCategory([FromBody] ProductDTO product)
        {
            var result = new ProductListDTO();
            try
            {
                result.Message = "";
                result.Success = true;
                result.Items = service.UpdateProduct(product);
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
