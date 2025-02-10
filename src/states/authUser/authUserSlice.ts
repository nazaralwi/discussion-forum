import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/models";
import api from "../../utils/api";

interface AuthUserState {
  authUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthUserState = {
  authUser: null,
  status: "idle",
};

export const fetchAuthUser = createAsyncThunk(
  "authUser/fetchAuthUser",
  async () => {
    return await api.getOwnProfile();
  },
);

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUser = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});
