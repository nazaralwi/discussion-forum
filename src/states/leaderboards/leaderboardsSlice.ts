import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Leaderboard } from "../../utils/models";
import api from "../../utils/api";

interface LeaderboardsState {
  leaderboards: Leaderboard[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LeaderboardsState = {
  leaderboards: null,
  status: "idle",
};

export const fetchLeaderboards = createAsyncThunk(
  "leaderboards/fetchLeaderboards",
  async () => {
    return await api.getAllLeaderboards();
  },
);

export const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state) => {
        state.status = "failed";
      });
  },
});
