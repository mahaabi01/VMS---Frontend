import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/Footer/Footer";
import Card from "../../globals/components/card/Card";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
