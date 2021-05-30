using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.Interfaces;
using SiteBackend.DTO;
using SiteBackend.Models;

namespace SiteBackend.Services
{
    public class ProductTypeService : IProductTypeService
    {
        ApplicationContext context;
        public ProductTypeService(ApplicationContext context)
        {
            this.context = context;
        }
        public List<ProductTypeDTO> GetAllProductTypes()
        {
            return GetFromDB();
        }
        public List<ProductTypeDTO> AddProductType(ProductTypeDTO typeDTO)
        {
            ProductType type = new ProductType();

            type.Type = typeDTO.Name;
            type.Image = typeDTO.Image;
            type.IsActive = true;

            context.ProductTypes.Add(type);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductTypeDTO> UpdateProductType(ProductTypeDTO typeDTO)
        {
            ProductType type = context.ProductTypes.Where(item => item.ID == typeDTO.ID).FirstOrDefault();

            if (type == null)
            {
                throw new NullReferenceException();
            }

            type.Type = typeDTO.Name;
            type.Image = typeDTO.Image;
            type.IsActive = true;

            context.ProductTypes.Update(type);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductTypeDTO> BlockProductType(int typeID)
        {
            ProductType type = context.ProductTypes.Where(item => item.ID == typeID).FirstOrDefault();

            if (type == null)
            {
                throw new NullReferenceException();
            }
            type.IsActive = !type.IsActive;

            context.ProductTypes.Update(type);
            context.SaveChanges();

            return GetFromDB();
        }
        public List<ProductTypeDTO> GetFromDB()
        {
            List<ProductTypeDTO> result = new List<ProductTypeDTO>();

            var db = context.ProductTypes.ToList();

            foreach (var type in db)
            {
                result.Add(new ProductTypeDTO()
                {
                    ID = type.ID,
                    Name = type.Type,
                    Image = type.Image,
                    IsActive = type.IsActive
                });
            }
            return result;
        }
        public List<ProductTypeDTO> GetAllActiveCategories()
        {
            List<ProductTypeDTO> result = new List<ProductTypeDTO>();

            var db = context.ProductTypes.Where(item => item.IsActive == true).ToList();

            foreach (var type in db)
            {
                result.Add(new ProductTypeDTO()
                {
                    ID = type.ID,
                    Name = type.Type,
                    Image = type.Image,
                    IsActive = type.IsActive
                });
            }
            return result;

        }
    }
}
