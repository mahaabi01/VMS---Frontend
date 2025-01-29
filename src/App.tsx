import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import store from "./store/store";
import { Provider } from "react-redux";
import Cart from "./pages/cart/Cart";
import SingleProduct from "./pages/product/SingleProduct";
import MyCart from "./pages/cart/MyCart";
import MyWishlist from "./pages/wishlist/MyWishList";
import MyCreditLedger from "./pages/creditLedger/MyCreditLedger";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/myCart" element={<Cart />} />
          <Route path="/product/:id" element= {<SingleProduct />} />
          <Route path="/myCart/:id" element= {<MyCart />} />
          <Route path="/myWishList/:id" element={<MyWishlist />} />
          <Route path="/myCreditLedger/:id" element={<MyCreditLedger />} />
          {/* <Route path="/products" element={<Product />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
