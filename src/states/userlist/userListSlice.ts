import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../utils/models';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

interface UserListState {
  userList: User[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserListState = {
  userList: null,
  status: 'idle',
};

export const fetchUserList = createAsyncThunk(
  'userList/fetchUserList',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const users = await api.getAllUsers();
      dispatch(hideLoading());
      return users;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
