import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { User } from "../../utils/models";

interface UserState {
  profile: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  profile: null,
  status: "idle",
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    return await api.getOwnProfile();
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default profileSlice;
