import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../utils/models";
import api from "../../utils/api";
import { RootState } from "..";

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
  async () => {
    return await api.getAllThreads();
  },
);

export const upVoteThread = createAsyncThunk(
  "threads/upVoteThread",
  async (id: string, { getState }) => {
    console.log("upVoteThread");
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.upVoteThread(id);
    return { threadId: id, userId: profile.id };
  },
);

export const downVoteThread = createAsyncThunk(
  "threads/downVoteThread",
  async (id: string, { getState }) => {
    console.log("downVoteThread");
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.downVoteThread(id);
    return { threadId: id, userId: profile.id };
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
      .addCase(upVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;

        const thread = state.threads?.find((t) => t.id === threadId);

        if (!thread) return;

        const hasUpvoted = thread.upVotesBy.includes(userId);
        const hasDownvoted = thread.downVotesBy.includes(userId);

        if (hasDownvoted) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }

        if (!hasUpvoted) thread.upVotesBy.push(userId);
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

        if (!hasDownvoted) thread.downVotesBy.push(userId);
      });
  },
});
