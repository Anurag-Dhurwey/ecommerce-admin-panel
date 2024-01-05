import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import productService from "./productService";

export const getprodusts = createAsyncThunk(
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

export const getDraftProducts = createAsyncThunk(
  "draft/DraftProducts",
  async (thunkAPI) => {
    try {
      const response = await productService.getDraftProducts();
      // if (response) {
      return response;
      // } else {
      //   return thunkAPI.rejectWithValue({ message: "response did't got" });
      // }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  draftProducts: [],
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
      .addCase(getprodusts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getprodusts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "products fetched successfully";
      })
      .addCase(getprodusts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(getDraftProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDraftProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.draftProducts = action.payload;
        state.message = "draft fetched successfully";
      })
      .addCase(getDraftProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export default productSlice.reducer;
