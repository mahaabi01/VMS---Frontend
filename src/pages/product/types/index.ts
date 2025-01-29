import { Status } from "../../../globals/types/types";

interface ICategory{
  id : string,
  categoryName : string
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  price: string;
  Category: ICategory
}

export interface IProducts{
  products : IProduct[],
  status : Status,
  product: IProduct | null
}