import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThreadDetail } from '../../utils/models';
import api from '../../utils/api';
import { RootState } from '..';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { fetchThreads } from '../threads/threadsSlice';

interface ThreadDetailState {
  thread: ThreadDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ThreadDetailState = {
  thread: null,
  status: 'idle',
};

export const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
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
  }
);

export const upVoteThread = createAsyncThunk(
  'threadDetail/upVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThread = {
        ...thread,
        upVotesBy: thread.upVotesBy.includes(profile.id)
          ? thread.upVotesBy
          : [...thread.upVotesBy, profile.id],
        downVotesBy: thread.downVotesBy.filter(
          (userId) => userId !== profile.id
        ),
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.upVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const downVoteThread = createAsyncThunk(
  'threadDetail/downVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThread = {
        ...thread,
        upVotesBy: thread.upVotesBy.filter((userId) => userId !== profile.id),
        downVotesBy: thread.downVotesBy.includes(profile.id)
          ? thread.downVotesBy
          : [...thread.downVotesBy, profile.id],
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.downVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const neutralizeVoteThread = createAsyncThunk(
  'threadDetail/neutralizeVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const newUpVotesBy = thread.upVotesBy.includes(profile.id)
        ? thread.upVotesBy.filter((userId) => userId !== profile.id)
        : thread.upVotesBy;

      const newDownVotesBy = thread.downVotesBy.includes(profile.id)
        ? thread.downVotesBy.filter((userId) => userId !== profile.id)
        : thread.downVotesBy;

      const updatedThread = {
        ...thread,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.neutralizeVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const upVoteComment = createAsyncThunk(
  'threadDetail/upVoteComment',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThread = {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            upVotesBy: [...comment.upVotesBy, profile.id],
            downVotesBy: comment.downVotesBy.filter(
              (userId) => userId !== profile.id
            ),
          };
        }),
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.upVoteComment(threadId, commentId);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const downVoteComment = createAsyncThunk(
  'threadDetail/downVoteComment',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThread = {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (userId) => userId !== profile.id
            ),
            downVotesBy: [...comment.downVotesBy, profile.id],
          };
        }),
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.downVoteComment(threadId, commentId);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const neutralizeVoteComment = createAsyncThunk(
  'threadDetail/neutralizeVoteComment',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const thread = state.threadDetail.thread;
    const profile = state.profile.profile;

    if (!thread) throw new Error('Thread not found');
    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThread = {
        ...thread,
        comments: thread.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const newUpVotesBy = comment.upVotesBy.includes(profile.id)
            ? comment.upVotesBy.filter((userId) => userId !== profile.id)
            : comment.upVotesBy;

          const newDownVotesBy = comment.downVotesBy.includes(profile.id)
            ? comment.downVotesBy.filter((userId) => userId !== profile.id)
            : comment.downVotesBy;

          return {
            ...comment,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy,
          };
        }),
      };

      dispatch(threadDetailSlice.actions.setThread(updatedThread));

      dispatch(showLoading());
      await api.neutralizeVoteComment(threadId, commentId);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(threadDetailSlice.actions.setThread(thread));
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const createComment1 = createAsyncThunk(
  'threadDetail/createComment1',
  async (
    { threadId, commentContent }: { threadId: string; commentContent: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error('User not authenticated');

    try {
      dispatch(showLoading());
      await api.createComment(threadId, commentContent);
      await dispatch(fetchThreadDetail(threadId));
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    setThread: (state, action) => {
      state.thread = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(upVoteThread.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upVoteThread.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(upVoteThread.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(downVoteThread.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downVoteThread.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(downVoteThread.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(neutralizeVoteThread.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(neutralizeVoteThread.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(neutralizeVoteThread.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createComment1.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment1.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createComment1.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(upVoteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upVoteComment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(upVoteComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(downVoteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downVoteComment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(downVoteComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(neutralizeVoteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(neutralizeVoteComment.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(neutralizeVoteComment.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
