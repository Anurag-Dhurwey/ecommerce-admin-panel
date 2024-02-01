// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// import draftService from "./draftService";
// import { product } from "../../utils/types";

// export const getDraftProducts = createAsyncThunk(
//   "draft/DraftProducts",
//   async (thunkAPI) => {
//     try {
//       const response = await draftService.getDraftProducts();
//       return response;
//     } catch (error:any) {
//       // return thunkAPI.rejectWithValue(error.response.data);
//       throw new Error(error.message)
//     }
//   }
// );
// interface initialState {
//   draftProducts: product[];
//   isError: boolean;
//   isLoading: boolean;
//   isSuccess: boolean;
//   message: string;
// }
// const initialState: initialState = {
//   draftProducts: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
// };

// export const draftSlice = createSlice({
//   name: "draftProduct",
//   initialState: initialState,
//   reducers: {
//     pushDraftProduct: (state, action: PayloadAction<product | product[]>) => {
//       let copy = [...state.draftProducts];
//       if (Array.isArray(action.payload)) {
//         copy = [...action.payload, ...copy];
//       } else if (typeof action.payload === "object") {
//         copy.unshift(action.payload);
//       }
//       state.draftProducts = [...copy];
//     },
//     replaceOneDraftProduct: (state, action) => {
//       // const {draft,_id}=action.payload
//       const updatedDraft = state.draftProducts.map((product) => {
//         if (product._id === action.payload._id) {
//           return action.payload;
//         }
//         return product;
//       });
//       state.draftProducts = updatedDraft;
//     },
//     removeOneDraftProduct: (state, action) => {
//       const updatedDraft = state.draftProducts.filter((product) => {
//         return product._id !== action.payload._id;
//       });
//       state.draftProducts = updatedDraft;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getDraftProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getDraftProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.draftProducts = action.payload;
//         state.message = "draft fetched successfully";
//       })
//       .addCase(getDraftProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         const errMsg = action.error.message;
//         state.message = errMsg
//           ? errMsg
//           : "something went wrong <getDraftProducts>";
//       });
//   },
// });
// export const {
//   replaceOneDraftProduct,
//   removeOneDraftProduct,
//   pushDraftProduct,
// } = draftSlice.actions;
// export default draftSlice.reducer;
