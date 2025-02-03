import { Status } from "./types"

interface User{
  id: string,
  email: string,
  username: string
}

export interface Product{
  id: string,
  name: string,
  productDescription: string,
  price: number,
  productTotalStockQty: number,
  productImageUrl: string,
  createdAt: string,
  updatedAt: string,
  userId: string,
  User: User,
  category: string
}

export interface ProductState{
  product: Product[],
  status: Status,
  singleProduct: Product | null,
  searchQuery: string;
}