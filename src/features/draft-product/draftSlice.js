import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import draftService from "./draftService";

export const getDraftProducts = createAsyncThunk(
  "draft/DraftProducts",
  async (thunkAPI) => {
    try {
      const response = await draftService.getDraftProducts();
      return response;
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

export const draftSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    pushDraftProduct: (state, action) => {
        console.log(action.payload,"action")
      state.draftProducts = [...action.payload, ...state.draftProducts];
    },
    replaceOneDraftProduct: (state, action) => {
      // const {draft,_id}=action.payload
      const updatedDraft = state.draftProducts.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
      state.draftProducts = updatedDraft;
    },
    removeOneDraftProduct: (state, action) => {
      const updatedDraft = state.draftProducts.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.draftProducts = updatedDraft;
    },
  },
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
export const { replaceOneDraftProduct, removeOneDraftProduct ,pushDraftProduct} =
  draftSlice.actions;
export default draftSlice.reducer;
