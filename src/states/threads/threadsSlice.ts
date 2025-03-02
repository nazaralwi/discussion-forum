import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../utils/models";
import api from "../../utils/api";
import { RootState } from "..";
import { hideLoading, showLoading } from "react-redux-loading-bar";

interface ThreadState {
  threads: Thread[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ThreadState = {
  threads: null,
  status: "idle",
};

export const fetchThreads = createAsyncThunk(
  "threads/fetchThreads",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await api.getAllThreads();
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const upVoteThread = createAsyncThunk(
  "threads/upVoteThread",
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.upVoteThread(id);
      dispatch(hideLoading());
      return { threadId: id, userId: profile.id };
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const downVoteThread = createAsyncThunk(
  "threads/downVoteThread",
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.downVoteThread(id);
      dispatch(hideLoading());
      return { threadId: id, userId: profile.id };
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const neutralizeVoteThread = createAsyncThunk(
  "threads/neutralizeVoteThread",
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.neutralizeVoteThread(id);
      dispatch(hideLoading());
      return { threadId: id, userId: profile.id };
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const createThread = createAsyncThunk(
  "threads/createThread",
  async (
    { title, body }: { title: string; body: string },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      const response = await api.createThread({ title: title, body: body });
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads?.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(upVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;

        const thread = state.threads?.find((t) => t.id === threadId);

        if (!thread) return;

        const hasUpvoted = thread.upVotesBy.includes(userId);
        const hasDownvoted = thread.downVotesBy.includes(userId);

        if (hasDownvoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }

        if (hasUpvoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
        }
        state.status = "succeeded";
      })
      .addCase(upVoteThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(downVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;

        const thread = state.threads?.find((t) => t.id === threadId);

        if (!thread) return;

        const hasUpvoted = thread.upVotesBy.includes(userId);
        const hasDownvoted = thread.downVotesBy.includes(userId);

        if (hasUpvoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }

        if (hasDownvoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
        }
        state.status = "succeeded";
      })
      .addCase(downVoteThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(neutralizeVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(neutralizeVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;

        const thread = state.threads?.find((t) => t.id === threadId);

        if (!thread) return;

        const hasUpvoted = thread.upVotesBy.includes(userId);
        const hasDownvoted = thread.downVotesBy.includes(userId);

        if (hasUpvoted) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }

        if (hasDownvoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
        state.status = "succeeded";
      })
      .addCase(neutralizeVoteThread.rejected, (state) => {
        state.status = "failed";
      });
  },
});
