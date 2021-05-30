using SiteBackend.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteBackend.Interfaces
{
    public interface IProductService
    {
        public List<ProductDTO> GetAllProducts();
        public List<ProductDTO> AddProduct(ProductDTO type);
        public List<ProductDTO> UpdateProduct(ProductDTO type);
        public List<ProductDTO> BlockProduct(int productID);
        public List<ProductDTO> GetProductsByCategory(int categoryID);
    }
}
