import { Status } from "./types"

interface User{
  id: string,
  email: string,
  username: string
}

export interface Product{
  id: string,
  productName: string,
  productDescription: string,
  productPrice: number,
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
  singleProduct: Prduct | null,
  searchQuery: string;
}