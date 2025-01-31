import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Product } from "../../globals/types/productTypes";

const ProductList: React.FC = () => {
  const { product, searchQuery } = useSelector(
    (state: RootState) => state.products
  );

  //filter products baded on search quert
  const filteredProducts = product.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <div key={product.id} className="border p-4">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p>Price: ${product.productPrice}</p>
              <p>Category: {product.category}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
