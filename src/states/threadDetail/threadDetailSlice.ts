import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadDetail } from "../../utils/models";
import api from "../../utils/api";
import { RootState } from "..";
import { hideLoading, showLoading } from "react-redux-loading-bar";

interface ThreadDetailState {
  thread: ThreadDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ThreadDetailState = {
  thread: null,
  status: "idle",
};

export const fetchThreadDetail = createAsyncThunk(
  "threads/fetchThreadDetail",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const detailThread = await api.getThreadDetail(id);
      dispatch(hideLoading());
      return detailThread;
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
      const detailThread = await api.getThreadDetail(id);
      dispatch(hideLoading());
      return detailThread;
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
      const detailThread = await api.getThreadDetail(id);
      dispatch(hideLoading());
      return detailThread;
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
      const detailThread = await api.getThreadDetail(id);
      dispatch(hideLoading());
      return detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const upVoteComment = createAsyncThunk(
  "threads/upVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.upVoteComment(threadId, commentId);
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(hideLoading());
      return detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const downVoteComment = createAsyncThunk(
  "threads/downVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.downVoteComment(threadId, commentId);
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(hideLoading());
      return detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const neutralizeVoteComment = createAsyncThunk(
  "threads/neutralizeVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.neutralizeVoteComment(threadId, commentId);
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(hideLoading());
      return detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const createComment1 = createAsyncThunk(
  "threads/createComment1",
  async (
    { threadId, commentContent }: { threadId: string; commentContent: string },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    try {
      dispatch(showLoading());
      await api.createComment(threadId, commentContent);
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(hideLoading());
      return detailThread;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(upVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upVoteThread.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(upVoteThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(downVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downVoteThread.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(downVoteThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(neutralizeVoteThread.pending, (state) => {
        state.status = "loading";
      })
      .addCase(neutralizeVoteThread.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(neutralizeVoteThread.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createComment1.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment1.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(createComment1.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(upVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upVoteComment.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(upVoteComment.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(downVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downVoteComment.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(downVoteComment.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(neutralizeVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(neutralizeVoteComment.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.status = "succeeded";
      })
      .addCase(neutralizeVoteComment.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetThreadDetail } = threadDetailSlice.actions;
