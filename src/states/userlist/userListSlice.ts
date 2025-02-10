import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/models";
import api from "../../utils/api";

interface UserListState {
  userList: User[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserListState = {
  userList: null,
  status: "idle",
};

export const fetchUserList = createAsyncThunk(
  "userList/fetchUserList",
  async () => {
    return await api.getAllUsers();
  },
);

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.status = "failed";
      });
  },
});
