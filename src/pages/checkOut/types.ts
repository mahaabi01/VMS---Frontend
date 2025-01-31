import { Status } from "../../globals/types/types";

interface IProduct{
  productId : string,
  productQty : number
}

export interface IOrderItems extends IProduct{
  orderId : string
}

export interface IOrder{
  status : Status,
  items : IOrderItems[],
  khaltiUrl : string | null
}

export enum PaymentMethod{
  Khalti = "khalti",
  Cod = "cod"
}

export interface IData{
  firstName : string,
  lastName : string,
  phoneNumber : string,
  email : string,
  city : string,
  zipcode : string,
  state : string,
  totalAmount : number,
  paymentMethod : PaymentMethod,
  products : IProduct[]
}