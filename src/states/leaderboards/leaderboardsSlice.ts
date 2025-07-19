import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Leaderboard } from '../../utils/models';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

interface LeaderboardsState {
  leaderboards: Leaderboard[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: LeaderboardsState = {
  leaderboards: null,
  status: 'idle',
};

export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const leaderboards = await api.getAllLeaderboards();
      dispatch(hideLoading());
      return leaderboards;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.leaderboards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchLeaderboards.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
