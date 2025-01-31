import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreditLedgerItem, CreditLedgerState } from "../globals/types/creditLedgerTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";
import { setStatus } from "./authSlice";

const initialState: CreditLedgerState = {
  creditLedger: [],
  isLoading: false,
  error: null,
  status: Status.LOADING,
}

const creditLedgerSlice = createSlice({
  name: "creditLedger",
  initialState,
  reducers: {
    setCreditLedger(state: CreditLedgerState, action: PayloadAction<CreditLedgerItem[]>) {
      state.creditLedger = action.payload;
    },
    setStatus(state: CreditLedgerState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
})

export const { setCreditLedger } = creditLedgerSlice.actions;
export default creditLedgerSlice.reducer;

export function fetchCreditLedger() {
  return async function fetchCreditLedgerThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("getMyCreditLedger");
      dispatch(setCreditLedger(response.data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  }
}
