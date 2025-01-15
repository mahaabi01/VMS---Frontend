export interface Props{
  type : string,
  onSubmit : (data:UserDataType)=>void
}

export interface UserDataType{
  email:string,
  password: string,
  name: string,
  phone: string,
  addres: string
}

export interface UserLoginType{
  email: string,
  password: string
}