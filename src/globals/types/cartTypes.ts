import { Product } from "./productTypes"
import { Status } from './types'

export interface CartItem{
  id: string,
  Product: Product,
  quantity: number
}

export interface CartState{
  items: CartItem[],
  isLoading: boolean,
  error: string | null,
  status: Status
}