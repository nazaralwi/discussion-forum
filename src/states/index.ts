import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile/profileSlice';
import { leaderboardsSlice } from './leaderboards/leaderboardsSlice';
import { userListSlice } from './userlist/userListSlice';
import { threadsSlice } from './threads/threadsSlice';
import { authUserSlice } from './authUser/authUserSlice';
import { threadDetailSlice } from './threadDetail/threadDetailSlice';
import { loginSlice } from './login/loginSlice';
import { registerSlice } from './register/registerSlice';
import { loadingBarReducer } from 'react-redux-loading-bar';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    threads: threadsSlice.reducer,
    leaderboards: leaderboardsSlice.reducer,
    userList: userListSlice.reducer,
    profile: profileSlice.reducer,
    authUser: authUserSlice.reducer,
    threadDetail: threadDetailSlice.reducer,
    loadingBar: loadingBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
