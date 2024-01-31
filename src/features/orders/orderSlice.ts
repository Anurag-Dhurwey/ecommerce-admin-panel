import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import orderService from "./orderService";
import { order } from "../../utils/types";

export const getOrders = createAsyncThunk(
  "orders/get-orders",
  async (data,thunkAPI) => {
    try {
      const response = await orderService.getOrders();
      return response;
    } catch (error:any) {
      // return thunkAPI.rejectWithValue(error.message);
      throw new Error(error.message)
    }
  }
);
interface initialState{
  orders: order[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState:initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "users fetched successfully";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const errMsg = action.error.message;
        state.message = errMsg ? errMsg : "something went wrong <getOrders>";
      });
  },
});

export default orderSlice.reducer;
