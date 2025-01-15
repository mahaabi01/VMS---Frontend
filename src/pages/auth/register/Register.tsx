import { register, resetStatus } from "../../../store/authSlice"
import Form from "../Form"
import { UserDataType } from "../types"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Status } from "../../../globals/types/types"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "../../../globals/components/navbar/Navbar"
import Footer from "../../../globals/components/Footer/Footer"


const Register = () => {
  const navigate = useNavigate()
  const {status}  = useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch()
  const handleRegister = async (data:UserDataType)=>{
    dispatch(register(data))
  }
  useEffect(()=>{
    if(status === Status.SUCCESS){
      dispatch(resetStatus())
      navigate("/login")
    }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
    <Form type="register" onSubmit={handleRegister}/>
    <Footer />
    </>
  )
}

export default Register