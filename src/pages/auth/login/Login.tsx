import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { UserLoginType } from "../types";
import { login, resetStatus } from "../../../store/authSlice";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";
import Navbar from "../../../globals/components/navbar/Navbar";
import Footer from "../../../globals/components/Footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  
  const dispatch = useAppDispatch();
  const handleLogin = async (data: UserLoginType) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/");
    }
  }, [status, navigate, dispatch]);
  return (
    <>
      {/* <Navbar /> */}
      <Form type="login" onSubmit={handleLogin} />;
      <Footer />
    </>
  );
};

export default Login;
