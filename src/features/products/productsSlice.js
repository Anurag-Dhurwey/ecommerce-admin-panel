import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getDraftProducts = createAsyncThunk(
  "draft/DraftProducts",
  async (thunkAPI) => {
    try {
      const response = await productService.getDraftProducts();
      if (response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue({ message: "response did't got" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  draftProducts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDraftProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDraftProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.draftProducts = action.payload;
        state.message = "users fetched successfully";
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
