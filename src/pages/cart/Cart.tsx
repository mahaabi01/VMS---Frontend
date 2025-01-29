import React, { useEffect, useState } from "react";

// Define CartItem type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define AddToCartPayload type
interface AddToCartPayload {
  id: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart/getMyCart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data: CartItem[] = await response.json();
        setCartItems(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Add to cart functionality
  const handleAddToCart = async (itemId: number, quantity: number) => {
    try {
      const payload: AddToCartPayload = {
        id: itemId,
        quantity: 1, // Increment by 1
      };

      const response = await fetch("http://localhost:3000/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Update cart locally after successful API call
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  // Calculate total cart value
  const totalValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg md:text-xl text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">
                      Rs. {item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item.id, 1)}
                      className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      + Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
              <p className="text-gray-800 dark:text-gray-100">Rs. {totalValue}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">Tax (13%)</p>
              <p className="text-gray-800 dark:text-gray-100">
                Rs. {(totalValue * 0.13).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <p>Total</p>
              <p>Rs. {(totalValue + totalValue * 0.13).toFixed(2)}</p>
            </div>
            <button
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
