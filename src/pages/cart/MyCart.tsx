import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/Footer/Footer";

const MyCart = () => {
  const [myCart, setMyCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyCarts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/cart/getMyCart"
        );
        setMyCart(response.data.data);
      } catch (error) {
        console.error("Error fetching my Cart:", error);
      }
    };

    fetchMyCarts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Cart</h2>
        {myCart.length > 0 ? (
          <ul className="space-y-4">
            {myCart.map((item, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p>Price: {item.price} USD</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyCart;
