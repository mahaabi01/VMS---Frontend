// 


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";
import { setStatus } from "./authSlice";

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
  status: Status.IDLE,
};

interface DeleteAction {
  productId: string;
}

interface UpdateAction extends DeleteAction {
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: CartState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteItem(state: CartState, action: PayloadAction<DeleteAction>) {
      const index = state.items.findIndex(
        (item) => item.Product.id === action.payload.productId
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    setUpdateItem(state: CartState, action: PayloadAction<UpdateAction>) {
      const index = state.items.findIndex(
        (item) => item.Product.id === action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
});

export const { setItems, setDeleteItem, setUpdateItem } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("cart/addToCart", {
        productId,
        quantity: 1,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/cart/getMyCart");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteCartItem(productId: string) {
  return async function deleteCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        "/cart/deleteMyCart/" + productId
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteItem({ productId }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateCartItem(productId: string, quantity: number) {
  return async function updateCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        "/cart/updateCartItem/" + productId,
        {
          quantity,
        }
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdateItem({ productId, quantity }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
