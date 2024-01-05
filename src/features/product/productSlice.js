import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import productService from "./productService";

export const getproduts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const response = await productService.getProducts();
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproduts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproduts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "products fetched successfully";
      })
      .addCase(getproduts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export default productSlice.reducer;
