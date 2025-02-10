import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import { leaderboardsSlice } from "./leaderboards/leaderboardsSlice";
import { userListSlice } from "./userlist/userlistSlice";
import { threadsSlice } from "./threads/threadsSlice";

export const store = configureStore({
  reducer: {
    threads: threadsSlice.reducer,
    leaderboards: leaderboardsSlice.reducer,
    userList: userListSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
