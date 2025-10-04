import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

interface LoginState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  status: 'idle',
  error: null,
};

export const fetchLogin = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: { message: string } }
>(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(showLoading());
      const token: string = await api.login({ email, password });
      dispatch(hideLoading());
      return token;
    } catch (error: unknown) {
      dispatch(hideLoading());

      let message = 'Login failed';

      if (error instanceof Error) {
        message = error.message;
      }

      return rejectWithValue({ message });
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        api.putAccessToken(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload && typeof action.payload === 'object') {
          state.error = (action.payload as { message: string }).message;
        } else {
          state.error = 'Login failed';
        }
      });
  },
});
