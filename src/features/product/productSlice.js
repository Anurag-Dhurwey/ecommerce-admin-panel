import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import productService from "./productService";

export const getproduts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const response = await productService.getProducts();
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
  reducers: {
    pushProduct: (state, action) => {
      state.products = [...action.payload, ...state.products];
    },
    replaceOneProduct: (state, action) => {
      const updatedProducts = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      state.products = updatedProducts;
    },
    removeOneProduct: (state, action) => {
      console.log(action.payload._id)
      const updatedProducts = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.products = updatedProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproduts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproduts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
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

export const { replaceOneProduct, removeOneProduct, pushProduct } =
  productSlice.actions;
export default productSlice.reducer;
