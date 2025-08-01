import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

interface RegisterState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RegisterState = {
  status: 'idle',
};

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(showLoading());
      const response = await api.register({ name, email, password });
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
