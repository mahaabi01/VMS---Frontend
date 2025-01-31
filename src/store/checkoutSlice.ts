import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { MyOrderData, OrderData, OrderDetails, OrderResponseData, OrderResponseItem, OrderStatus } from "../globals/types/checkoutTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http"

const initialState:OrderResponseData = {
  items : [],
  status : Status.LOADING,
  khaltiUrl : null,
  myOrders : [],
  orderDetails : []
}

const orderSlice = createSlice({
  name : 'order',
  initialState,
  reducers: {
    setItems(state: OrderResponseData, action: PayloadAction<OrderResponseData>){
      state.items.push(action.payload)
    },
    setMyOrders(state:OrderResponseData, action:PayloadAction<MyOrderData[]>){
      state.myOrders = action.payload
    },
    setStatus(state:OrderResponseData, action: PayloadAction<Status>){
      state.status = action.payload
    },
    setKhaltiUrl(state:OrderResponseData, action:PayloadAction<OrderResponseData['khaltiUrl']>){
      state.khaltiUrl = action.payload
    },
    setMyOrderDetails(state:OrderResponseData, action:PayloadAction<OrderDetails[]>){
      state.orderDetails = action.payload
    },
    updateOrderStatus(state:OrderResponseData, action:PayloadAction<{status:OrderStatus, orderId: string}>){
      const status = action.payload.status
      const orderId = action.payload.orderId
      const updatedOrder = state.myOrders.map(order=>order.id == orderId ? {...order, orderStatus : status} : order)
      state.myOrders = updatedOrder
    }
  }
})

export const {setItems, setStatus, setKhaltiUrl, setMyOrders, setMyOrderDetails,updateOrderStatus} = orderSlice.actions
export default orderSlice.reducer


export function orderItem(data:OrderData){
  return async function orderItemThunk(dispatch : AppDispatch){
      dispatch(setStatus(Status.LOADING))
      try {
          const response = await APIAuthenticated.post('/order/createOrder',data)
          if(response.status === 200){
              dispatch(setStatus(Status.SUCCESS))
              dispatch(setItems(response.data.data))
              if(response.data.url){
                  dispatch(setKhaltiUrl(response.data.url))
              }else{
                  dispatch(setKhaltiUrl(null))
              }
          }else{
              dispatch(setStatus(Status.ERROR))
          }
      } catch (error) {
        console.log(error)
          dispatch(setStatus(Status.ERROR))
      }
  }
}



export function fetchMyOrders(){
  return async function fetchMyOrdersThunk(dispatch : AppDispatch){
      dispatch(setStatus(Status.LOADING))
      try {
          const response = await APIAuthenticated.get('order/getMyOrders')
          if(response.status === 200){
              dispatch(setStatus(Status.SUCCESS))
              dispatch(setMyOrders(response.data.data))
          }else{
              dispatch(setStatus(Status.ERROR))
          }
      } catch (error) {
        console.log(error)
          dispatch(setStatus(Status.ERROR))
      }
  }
}

export function fetchMyOrderDetails(id:string){
  return async function fetchMyOrderDetailsThunk(dispatch : AppDispatch){
      dispatch(setStatus(Status.LOADING))
      try {
          const response = await APIAuthenticated.get('/order/getorderbyid/' + id)
          if(response.status === 200){
              dispatch(setStatus(Status.SUCCESS))
              dispatch(setMyOrderDetails(response.data.data))
          }else{
              dispatch(setStatus(Status.ERROR))
          }
      } catch (error) {
        console.log(error)
          dispatch(setStatus(Status.ERROR))
      }
  }
}

export function cancelMyOrder(id:string){
  return async function cancelMyOrderThunk(dispatch : AppDispatch){
      dispatch(setStatus(Status.LOADING))
      try {
          const response = await APIAuthenticated.patch('order/deleteorder/' + id)
          if(response.status === 200){
              dispatch(setStatus(Status.SUCCESS))
            
          }else{
              dispatch(setStatus(Status.ERROR))
          }
      } catch (error) {
        console.log(error)
          dispatch(setStatus(Status.ERROR))
      }
  }
}

