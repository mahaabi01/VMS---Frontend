import { useState, useEffect } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/Footer/Footer";
import Card from "../../globals/components/card/Card";
import SubNavbar from "../../globals/components/navbar/SubNavbarCategory";
import Sidebar from "../../globals/components/sidebar/Sidebar";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/product/getAllProduct"
        );
        setProducts(response.data.data); // Assuming the response is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <SubNavbar />
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Sidebar />
          <Card products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
