import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../utils/models';
import api from '../../utils/api';

interface AuthUserState {
  authUser: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthUserState = {
  authUser: null,
  token: null,
  status: 'idle',
};

export const setAuthUser = createAsyncThunk(
  'authUser/fetchAuthUser',
  async ({ email, password }: { email: string; password: string }) => {
    return await api.login({ email, password });
  }
);

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setAuthUser.fulfilled, (state, action) => {
        state.token = action.payload;
        api.putAccessToken(state.token);
        state.status = 'succeeded';
      })
      .addCase(setAuthUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
