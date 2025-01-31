import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from '../globals/types/productTypes'
import { Status } from '../globals/types/types'
import { AppDispatch, RootState } from "./store";
import { API } from '../http'
import { setStatus } from "./authSlice";

const initialState:ProductState = {
  product : [],
  status : Status.LOADING,
  singleProduct : null,
  searchQuery : ""
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchQuery: (state, action:PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setProduct(state:ProductState, action:PayloadAction<Product[]>){
      state.product = action.payload
    },
    setSingleProduct(state:ProductState,action:PayloadAction<Product>){
      state.singleProduct = action.payload
    }
  }
})


export const {setProduct, setSearchQuery, setSingleProduct} = productSlice.actions
export default productSlice.reducer

export function fetchProducts(){
  return async function fetchProductsThunk(dispatch: AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try{
      const response = await API.get('product/getAllProduct')
      console.log("Response :", response)
      if(response.status === 200){
        const {data} = response.data
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setProduct(data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(error){
      console.log("Error: ", error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function fetchByProductId(productId: string){
  return async function fetchByProductIdThunk(dispatch:AppDispatch, getState: ()=>RootState)
  {
    const state = getState()
    console.log("State: ", state)
    // const existingProduct = state.products.product.find((product:Product)=>product.id === productId)
    const existingProduct = state.products.product.find((product: Product) => product.id === productId);
    if(existingProduct){
      dispatch(setSingleProduct(existingProduct))
      dispatch(setStatus(Status.SUCCESS))
    }else{
      dispatch(setStatus(Status.LOADING))
      try{
        const response = await API.get(`/product/getSingleProduct//${productId}`)
        if(response.status === 200){
          const { data } = response.data
          dispatch(setStatus(Status.SUCCESS))
          dispatch(setSingleProduct(data))
        }else{
          dispatch(setStatus(Status.ERROR))
        }
      }catch(error){
        console.log("Error: ", error)
        dispatch(setStatus(Status.ERROR))
      }
    }
  }
}