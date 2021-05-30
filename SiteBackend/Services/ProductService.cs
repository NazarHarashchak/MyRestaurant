using Microsoft.EntityFrameworkCore;
using SiteBackend.DTO;
using SiteBackend.Interfaces;
using SiteBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Services
{
    public class ProductService : IProductService
    {
        ApplicationContext context;
        public ProductService(ApplicationContext context)
        {
            this.context = context;
        }
        public List<ProductDTO> GetAllProducts()
        {
            return GetFromDB();
        }
        public List<ProductDTO> AddProduct(ProductDTO productDTO)
        {
            Product product = new Product();

            product.Name = productDTO.Name;
            product.ProductContent = productDTO.ProductContent;
            product.ProductType = context.ProductTypes.Where(item => item.ID == productDTO.ProductTypeID).FirstOrDefault();
            product.Weight = productDTO.Weight;
            product.Price = productDTO.Price;
            product.Image = productDTO.Image;
            product.IsActive = true;

            context.Products.Add(product);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductDTO> UpdateProduct(ProductDTO productDTO)
        {
            Product product = context.Products.Include(item => item.ProductType).Where(item => item.ID == productDTO.ID).FirstOrDefault();

            if (product == null)
            {
                throw new NullReferenceException();
            }

            product.Name = productDTO.Name;
            product.ProductContent = productDTO.ProductContent;
            product.ProductType = context.ProductTypes.Where(item => item.ID == productDTO.ProductTypeID).FirstOrDefault();
            product.Weight = productDTO.Weight;
            product.Price = productDTO.Price;
            product.Image = productDTO.Image;

            context.Products.Update(product);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductDTO> BlockProduct(int typeID)
        {
            Product product = context.Products.Where(item => item.ID == typeID).FirstOrDefault();

            if (product == null)
            {
                throw new NullReferenceException();
            }
            product.IsActive = !product.IsActive;

            context.Products.Update(product);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductDTO> GetFromDB()
        {
            List<ProductDTO> result = new List<ProductDTO>();

            var db = context.Products.Include(item => item.ProductType).ToList();

            foreach (var product in db)
            {
                result.Add(new ProductDTO()
                {
                    ID = product.ID,
                    Name = product.Name,
                    Price = product.Price,
                    ProductContent = product.ProductContent,
                    ProductType = product.ProductType.Type,
                    ProductTypeID = product.ProductType.ID,
                    Weight = product.Weight,
                    Image = product.Image,
                    IsActive = product.IsActive
                });
            }
            return result;
        }
        public List<ProductDTO> GetProductsByCategory(int categoryID)
        {
            List<ProductDTO> result = new List<ProductDTO>();

            var db = context.Products.Include(item => item.ProductType).Where(item => item.IsActive == true).Where(item => item.ProductType.ID == categoryID).ToList();

            foreach (var product in db)
            {
                result.Add(new ProductDTO()
                {
                    ID = product.ID,
                    Name = product.Name,
                    Price = product.Price,
                    ProductContent = product.ProductContent,
                    ProductType = product.ProductType.Type,
                    ProductTypeID = product.ProductType.ID,
                    Weight = product.Weight,
                    Image = product.Image,
                    IsActive = product.IsActive
                });
            }
            return result;
        }
    }
}
