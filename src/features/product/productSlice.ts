import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import productService from "./productService";
import { product } from "../../utils/types";

export const getPublished = createAsyncThunk(
  "product/get-products",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getProducts();
      return response;
    } catch (error: any) {
      // return thunkAPI.rejectWithValue(error.response.data);
      throw new Error(error.message);
    }
  }
);
export const getDraft = createAsyncThunk(
  "draft/DraftProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.getDraftProducts();
      return response;
    } catch (error: any) {
      // return thunkAPI.rejectWithValue(error.response.data);
      throw new Error(error.message);
    }
  }
);

interface initialState {
  published: {
    products: product[];
    isError?: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    message?: string;
  };
  draft: {
    products: product[];
    isError?: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    message?: string;
  };
}

const initialState: initialState = {
  published: {
    products: [],
    isError: undefined,
    isLoading: undefined,
    isSuccess: undefined,
    message: undefined,
  },
  draft: {
    products: [],
    isError: undefined,
    isLoading: undefined,
    isSuccess: undefined,
    message: undefined,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        products: product | product[];
        section: "published" | "draft";
      }>
    ) => {
      const { products, section } = action.payload;
      if (Array.isArray(products)) {
        switch (section) {
          case "published":
            state.published.products = [
              ...products,
              ...state.published.products,
            ];
            break;
          case "draft":
            state.draft.products = [...products, ...state.draft.products];
            break;
          default:
            break;
        }
      } else if (typeof products === "object") {
        switch (section) {
          case "published":
            state.published.products = [products, ...state.published.products];
            break;
          case "draft":
            state.draft.products = [products, ...state.draft.products];
            break;

          default:
            break;
        }
      }
    },
    replaceOneProduct: (
      state,
      action: PayloadAction<{
        product: product;
        section: "published" | "draft";
      }>
    ) => {
      const { product, section } = action.payload;
      switch (section) {
        case "published":
          state.published.products = state.published.products.map((item) => {
            if (item._id === product._id) {
              return product;
            }
            return item;
          });
          break;
        case "draft":
          state.draft.products = state.draft.products.map((item) => {
            if (item._id === product._id) {
              return product;
            }
            return item;
          });
          break;

        default:
          break;
      }
    },
    removeProduct: (
      state,
      action: PayloadAction<{
        ids: string | string[];
        section: "published" | "draft";
      }>
    ) => {
      const { ids, section } = action.payload;
      switch (section) {
        case "published":
          state.published.products = state.published.products.filter((item) => {
            return typeof ids === "string"
              ? item._id !== ids
              : !ids.includes(item._id);
          });
          break;
        case "draft":
          state.draft.products = state.draft.products.filter((item) => {
            return typeof ids === "string"
              ? item._id !== ids
              : !ids.includes(item._id);
          });
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublished.pending, (state) => {
        state.published.isLoading = true;
      })
      .addCase(getPublished.fulfilled, (state, action) => {
        state.published.isLoading = false;
        state.published.isSuccess = true;
        state.published.isError = false;
        state.published.products = action.payload;
      })
      .addCase(getPublished.rejected, (state, action) => {
        state.published.isLoading = false;
        state.published.isSuccess = false;
        state.published.isError = true;
        const errMsg = action.error.message;
        state.published.message = errMsg
          ? errMsg
          : "something went wrong <getPublished>";
      })
      .addCase(getDraft.pending, (state) => {
        state.draft.isLoading = true;
      })
      .addCase(getDraft.fulfilled, (state, action) => {
        state.draft.isLoading = false;
        state.draft.isSuccess = true;
        state.draft.isError = false;
        state.draft.products = action.payload;
      })
      .addCase(getDraft.rejected, (state, action) => {
        state.draft.isLoading = false;
        state.draft.isSuccess = false;
        state.draft.isError = true;
        const errMsg = action.error.message;
        state.draft.message = errMsg
          ? errMsg
          : "something went wrong <getDraft>";
      });
  },
});

export const { replaceOneProduct, removeProduct, addProduct } =
  productSlice.actions;
export default productSlice.reducer;
