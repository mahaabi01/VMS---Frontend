import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/Footer/Footer";

const MyWishlist = () => {
  const [myWishlist, setMyWishlist] = useState<any[]>([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/wishlist/getWishlist"
        );
        setMyWishlist(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/wishlist/addWishlist",
        {
          productName,
        }
      );

      if (response.status === 201) {
        setMyWishlist([...myWishlist, response.data.data]);
        setProductName("");
        setPrice("");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

        {/* Wishlist Form */}
        <form
          onSubmit={handleAddWishlist}
          className="mb-6 p-4 border rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Add to Wishlist</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Wishlist
          </button>
        </form>

        {/* Wishlist Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Product Name</th>
            </tr>
          </thead>
          <tbody>
            {myWishlist.length > 0 ? (
              myWishlist.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.productName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border p-4 text-center">
                  Your wishlist is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyWishlist;
