import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface RegisterState {
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RegisterState = {
  status: "idle",
};

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    return await api.register({ name, email, password });
  },
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "failed";
      });
  },
});
