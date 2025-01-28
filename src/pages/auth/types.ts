export interface Props{
  type : string,
  onSubmit : (data:UserDataType)=>void
}

export interface UserDataType{
  email:string,
  password: string,
  name: string,
  phone: string,
  address: string,
  role: string
}

export interface UserLoginType{
  email: string,
  password: string
}