import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import enquiryService from "./enquiryService";
import { enquiry, order } from "../../utils/types";

export const getEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (data,thunkAPI) => {
    try {
      const response = await enquiryService.getEnquiry();
      return response;
    } catch (error:any) {
      // return thunkAPI.rejectWithValue(error.message);
      throw new Error(error.message)
    }
  }
);
interface initialState{
  enquiry: enquiry[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState:initialState = {
  enquiry: [],
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
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
        state.message = "enquiry fetched successfully";
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const errMsg = action.error.message;
        state.message = errMsg ? errMsg : "something went wrong <getEnquiry>";
      });
  },
});

export default orderSlice.reducer;
