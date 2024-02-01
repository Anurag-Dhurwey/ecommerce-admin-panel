import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService, { loginBody, userRes } from "./authService";

// const getUserfromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

interface initialState {
  user: userRes|null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState:initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user: loginBody, thunkAPI) => {
    try {
      const response = await authService.login(user);
      return response;
    } catch (error: any) {
      // return thunkAPI.rejectWithValue({message:error.toString()});
      throw new Error(`${error.message}`);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "logout successfully";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "login successfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const errMsg = action.error.message;
        state.message = errMsg
          ? errMsg
          : "something went wrong <login>";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
