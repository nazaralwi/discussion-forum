import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { User } from '../../utils/models';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

interface UserState {
  profile: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  profile: null,
  status: 'idle',
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const user = await api.getOwnProfile();
      dispatch(hideLoading());
      return user;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default profileSlice;
