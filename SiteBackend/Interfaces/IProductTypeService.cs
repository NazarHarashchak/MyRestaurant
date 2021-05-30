using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SiteBackend.DTO;

namespace SiteBackend.Interfaces
{
    public interface IProductTypeService
    {
        public List<ProductTypeDTO> GetAllProductTypes();
        public List<ProductTypeDTO> AddProductType(ProductTypeDTO type);
        public List<ProductTypeDTO> UpdateProductType(ProductTypeDTO type);
        public List<ProductTypeDTO> BlockProductType(int typeID);
        public List<ProductTypeDTO> GetAllActiveCategories();
    }
}
