import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  price: string;
}

interface CardProps {
  products: Product[];
}

const Card: React.FC<CardProps> = ({ products }) => {
  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localstorage");
        return;
      }

      const response = await fetch("http://localhost:3000/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.status === 200) {
        console.log("Added to cart");
      } else {
        console.error("Error adding to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="max-w-7xl mr-60 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 w-full min-w-[200px]"
        >
          <Link to={`/product/${product.id}`} className="block">
            <img
              className="w-full h-56 object-cover"
              src={
                "http://localhost:3000/" + product.imageUrl ||
                "https://picsum.photos/536/354"
              }
              alt={product.name}
            />
          </Link>

          <div className="p-5 mb-5">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white hover:text-blue-600">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center mt-3 mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {(product.rating || 0).toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
