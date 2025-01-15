import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import store from "./store/store";
import { Provider } from "react-redux";
import Test from "./pages/auth/test/Test";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
