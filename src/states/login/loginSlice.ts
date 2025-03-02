import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

interface LoginState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LoginState = {
  token: null,
  status: "idle",
};

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(showLoading());
      const token: string = await api.login({ email, password });
      dispatch(hideLoading());
      return token;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        api.putAccessToken(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = "failed";
      });
  },
});
