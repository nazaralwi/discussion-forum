import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadDetail } from "../../utils/models";
import api from "../../utils/api";
import { RootState } from "..";

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
  async (id: string) => {
    return await api.getThreadDetail(id);
  },
);

export const upVoteThread = createAsyncThunk(
  "threads/upVoteThread",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.upVoteThread(id);
    return { userId: profile.id };
  },
);

export const downVoteThread = createAsyncThunk(
  "threads/downVoteThread",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.downVoteThread(id);
    return { userId: profile.id };
  },
);

export const neutralizeVoteThread = createAsyncThunk(
  "threads/neutralizeVoteThread",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.neutralizeVoteThread(id);
    return { userId: profile.id };
  },
);

export const upVoteComment = createAsyncThunk(
  "threads/upVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.upVoteComment(threadId, commentId);
    return { commentId, profile };
  },
);

export const downVoteComment = createAsyncThunk(
  "threads/downVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.downVoteComment(threadId, commentId);
    return { commentId, profile };
  },
);

export const neutralizeVoteComment = createAsyncThunk(
  "threads/neutralizeVoteComment",
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    await api.neutralizeVoteComment(threadId, commentId);
    return { commentId, profile };
  },
);

export const createComment1 = createAsyncThunk(
  "threads/createComment1",
  async (
    { threadId, commentContent }: { threadId: string; commentContent: string },
    { getState },
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error("User not authenticated");

    const response = await api.createComment(threadId, commentContent);
    return { threadId, comment: response, profile: profile.id };
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
