import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";
import { setStatus } from "./authSlice";

const initialState:CartState = {
  items : [],
  status : Status.LOADING
}

interface DeleteAction{
  productId : string
}

interface UpdateAction extends DeleteAction{
  quality : number
}

const cartSlice = createSlice({
  name : 'cart',
  initialState,
  reducer : {
    setItems(state: CartState, action: PayloadAction<CartItem[]>){
      state.items = action.payload
    },
    setStatus(state:CartState, action: PayloadAction<Status>){
      state.status = action.payload
    },
    setDeleteItem(state:CartState, action:PayloadAction<DeleteAction>){
      const index = state.items.findIndex(item.Product.id = action.payload.productId)
      state.items.splice(index,1)
    },
    setUpdateItem(state:CartState, action:PayloadAction<UpdateAction>){
      const index = state.items.findIndex(item=>item.Product.id = action.payload.productId)
      if(index !== -1){
        state.items[index].quantity = action.payload.quality
      }
    }
  }
})

export const { setItems, setStatus, setDeleteItem, setUpdateItem } = cartSlice.actions
export default cartSlice.reducer

export const {setItems, setStatus, serDeleteItem, setUpdateItem} = cartSlice.actions
export default cartSlice.reducer

export default cartSlice.reducer

export function addToCart(productId: string){
  return async function addToCartThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try{
      const response = await APIAuthenticated.post('cart/addToCart', {
        productId,
        quantity : 1
      })
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setItems(response.data.data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(error){
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function fetchCartItems(){
  return async function fetchCartItemsThunk(dispatch: AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try{
      const response = await APIAuthenticated.get('/customer/cart')
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setItems(response.data.data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(error){
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function deleteCartItem(productId:string){
  return async function deleteCartItemThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try{
      const response = await APIAuthenticated.delete('/cart/deleteMyCart'+productId)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setDeleteItem({productId}))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(error){
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function updateCartItem(productId:string,quantity : number){
  return async function updateCartItemThunk(dispatch : AppDispatch){
      dispatch(setStatus(Status.LOADING))
      try {
          const response = await APIAuthenticated.patch('/customer/cart/' + productId,{
              quantity
          })
          if(response.status === 200){
              dispatch(setStatus(Status.SUCCESS))
              dispatch(setUpdateItem({productId,quantity}))
          }else{
              dispatch(setStatus(Status.ERROR))
          }
      } catch (error) {
          dispatch(setStatus(Status.ERROR))
      }
  }
}