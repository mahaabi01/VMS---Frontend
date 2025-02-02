import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../globals/components/navbar/Navbar";
import {
  fetchCartItems,
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../../store/cartSlice";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../store/hooks";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart( productId.toString() ));
  };

  const handleDeleteCartItem = (itemId: string) => {
    dispatch(deleteCartItem(itemId.toString()));
  };

  const handleUpdateCartItem = (itemId: string, quantity: number) => {
    dispatch(updateCartItem(itemId.toString(), quantity));
  };

  const totalValue = items.reduce(
    (total, item) => total + item?.Product?.price * item.quantity,
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
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg md:text-xl text-gray-600">
              Your cart is empty.
            </p>
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
                {items.map((item) => (
                  <li
                    key={item?.Product?.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <p className="text-lg font-medium">{item.Product?.productName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item?.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold">
                        Rs. {item?.Product?.price * item?.quantity}
                      </p>
                      <button
                        onClick={() => handleAddToCart(item?.Product?.id)}
                        className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => handleDeleteCartItem(item.Product?.id)}
                        className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateCartItem(item?.Product?.id, item?.quantity + 1)
                        }
                        className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        Update
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
                <p className="text-gray-800 dark:text-gray-100">
                  Rs. {totalValue}
                </p>
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
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
