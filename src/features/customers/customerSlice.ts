import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customerService from "./customerService";
import { user } from "../../utils/types";

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (data,thunkAPI) => {
    try {
      const response = await customerService.getUsers();
      return response;
    } catch (error:any) {
      // return thunkAPI.rejectWithValue(error.response.data);
      throw new Error(error.message)
    }
  }
);

interface initialState {
  customers: user[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState:initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const customerSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "users fetched successfully";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const errMsg = action.error.message;
        state.message = errMsg
          ? errMsg
          : "something went wrong <getDraftProducts>";
      });
  },
});

export default customerSlice.reducer;
