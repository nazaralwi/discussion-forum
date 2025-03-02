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
      const response = await api.getThreadDetail(id);
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
      return { userId: profile.id };
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
      return { userId: profile.id };
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
      return { userId: profile.id };
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
      dispatch(hideLoading());
      return { commentId, profile };
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
      dispatch(hideLoading());
      return { commentId, profile };
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
      dispatch(hideLoading());
      return { commentId, profile };
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
      const response = await api.createComment(threadId, commentContent);
      dispatch(hideLoading());
      return { threadId, comment: response, profile: profile.id };
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  },
);

export const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState,
  reducers: {
    resetThreadDetail: (state) => {
      state.status = "idle";
      state.thread = null;
    },
  },
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
        const { userId } = action.payload;

        const thread = state.thread;

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
        const { userId } = action.payload;

        const thread = state.thread;

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
        const { userId } = action.payload;

        const thread = state.thread;

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
      .addCase(upVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upVoteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { commentId, profile } = action.payload;

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

        const hasUpvoted = state.thread?.comments.filter((comment) =>
          comment.upVotesBy.includes(profile.id),
        );
        const hasDownvoted = state.thread?.comments.filter((comment) =>
          comment.downVotesBy.includes(profile.id),
        );

        if (!hasUpvoted && state.thread)
          state.thread.comments = originalComments!;

        if (hasDownvoted && state.thread)
          state.thread.comments = updatedComments!;
      })
      .addCase(upVoteComment.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(downVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downVoteComment.fulfilled, (state, action) => {
        const { commentId, profile } = action.payload;

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

        const hasUpvoted = state.thread?.comments.filter((comment) =>
          comment.upVotesBy.includes(profile.id),
        );
        const hasDownvoted = state.thread?.comments.filter((comment) =>
          comment.downVotesBy.includes(profile.id),
        );

        if (hasUpvoted && state.thread)
          state.thread.comments = updatedComments!;

        if (!hasDownvoted && state.thread)
          state.thread.comments = originalComments!;
        state.status = "succeeded";
      })
      .addCase(downVoteComment.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(neutralizeVoteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(neutralizeVoteComment.fulfilled, (state, action) => {
        const { commentId, profile } = action.payload;

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
                : comment.downVotesBy,
            };
          }

          return comment;
        });

        const hasUpvoted = state.thread?.comments.filter((comment) =>
          comment.upVotesBy.includes(profile.id),
        );
        const hasDownvoted = state.thread?.comments.filter((comment) =>
          comment.downVotesBy.includes(profile.id),
        );

        if (hasUpvoted && state.thread)
          state.thread.comments = updatedComments!;

        if (hasDownvoted && state.thread)
          state.thread.comments = updatedComments!;
        state.status = "succeeded";
      })
      .addCase(neutralizeVoteComment.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetThreadDetail } = threadDetailSlice.actions;
