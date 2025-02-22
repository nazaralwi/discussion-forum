import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Thread, ThreadDetail } from "../../utils/models";
import api from "../../utils/api";
import { RootState } from "..";

interface ThreadDetailState {
  thread: ThreadDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: ThreadDetailState = {
  thread: null,
  status: "idle"
};

export const fetchThreadDetail2 = createAsyncThunk(
  "threads/fetchThreadDetail",
  async (id: string) => {
    return await api.getThreadDetail(id);
  }
);

export const upVoteComment = createAsyncThunk(
  "threads/upVoteComment",
  async ({ threadId, commentId }: { threadId: string, commentId: string }, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.upVoteComment(threadId, commentId);
    return { threadId, commentId, profile }
  }
)

export const downVoteComment = createAsyncThunk(
  "threads/downVoteComment",
  async ({ threadId, commentId }: { threadId: string, commentId: string }, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.downVoteComment(threadId, commentId);
    return { threadId, commentId, profile };
  }
)

export const createComment1 = createAsyncThunk(
  "threads/createComment1",
  async ({ threadId, commentContent }: { threadId: string, commentContent: string }, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.createComment(threadId, commentContent);
    return { threadId, comment: response, profile: profile.id };
  }
)

export const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail2.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThreadDetail2.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail2.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createComment1.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.thread?.comments.unshift(action.payload.comment);
      })
      .addCase(createComment1.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(upVoteComment.fulfilled, (state, action) => {
        const { threadId, commentId, profile } = action.payload;
    
        const originalComments = state.thread?.comments;
        const updatedComments = state.thread?.comments.map((comment) => {
          if (comment.id === commentId) {
            const hasUpvoted = comment.upVotesBy.includes(profile.id);
            const hasDownvoted = comment.downVotesBy.includes(profile.id);
    
            return {
              ...comment,
              upVotesBy: hasUpvoted
                ? comment.upVotesBy.filter((userId) => userId !== profile.id)
                : [...comment.upVotesBy, profile.id],
              downVotesBy: hasDownvoted
                ? comment.downVotesBy.filter((userId) => userId !== profile.id)
                : comment.downVotesBy,
            };
          }
    
          return comment;
        });

        const hasUpvoted = state.thread?.comments.filter((comment) => comment.upVotesBy.includes(profile.id));
        const hasDownvoted = state.thread?.comments.filter((comment) => comment.downVotesBy.includes(profile.id));

        if (!hasUpvoted && state.thread) state.thread.comments = originalComments!;

        if (hasDownvoted && state.thread) state.thread.comments = updatedComments!;
      })

      .addCase(downVoteComment.fulfilled, (state, action) => {
        const { threadId, commentId, profile } = action.payload;
    
        const originalComments = state.thread?.comments;
        const updatedComments = state.thread?.comments.map((comment) => {
          if (comment.id === commentId) {
            const hasUpvoted = comment.upVotesBy.includes(profile.id);
            const hasDownvoted = comment.downVotesBy.includes(profile.id);
    
            return {
              ...comment,
              upVotesBy: hasUpvoted
                ? comment.upVotesBy.filter((userId) => userId !== profile.id)
                : comment.upVotesBy,
              downVotesBy: hasDownvoted
                ? comment.downVotesBy.filter((userId) => userId !== profile.id)
                : [...comment.downVotesBy, profile.id],
            };
          }
    
          return comment;
        });

        const hasUpvoted = state.thread?.comments.filter((comment) => comment.upVotesBy.includes(profile.id));
        const hasDownvoted = state.thread?.comments.filter((comment) => comment.downVotesBy.includes(profile.id));

        if (hasUpvoted && state.thread) state.thread.comments = updatedComments!

        if (!hasDownvoted && state.thread) state.thread.comments = originalComments!;
      })
      .addCase("RESET_STATE", () => initialState);
  }
})