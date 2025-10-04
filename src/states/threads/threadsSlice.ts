import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Thread } from '../../utils/models';
import api from '../../utils/api';
import { RootState } from '..';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

export interface ThreadState {
  threads: Thread[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ThreadState = {
  threads: null,
  status: 'idle',
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const threads = await api.getAllThreads();
      dispatch(hideLoading());
      return threads;
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const upVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const threads = state.threads.threads;
    const profile = state.profile.profile;

    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThreads = threads?.map((thread) =>
        thread.id === id
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(profile.id)
              ? thread.upVotesBy
              : [...thread.upVotesBy, profile.id],
            downVotesBy: thread.downVotesBy.filter((userId) => userId !== profile.id),
          }
          : thread
      );
      dispatch(threadsSlice.actions.setThreads(updatedThreads));

      dispatch(showLoading());
      await api.upVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const downVoteThread = createAsyncThunk(
  'threads/downVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const threads = state.threads.threads;
    const profile = state.profile.profile;

    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThreads = threads?.map((thread) =>
        thread.id === id
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((userId) => userId !== profile.id),
            downVotesBy: thread.downVotesBy.includes(profile.id)
              ? thread.downVotesBy
              : [...thread.downVotesBy, profile.id],
          }
          : thread
      );
      dispatch(threadsSlice.actions.setThreads(updatedThreads));

      dispatch(showLoading());
      await api.downVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const neutralizeVoteThread = createAsyncThunk(
  'threads/neutralizeVoteThread',
  async (id: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const threads = state.threads.threads;
    const profile = state.profile.profile;

    if (!profile) throw new Error('User not authenticated');

    try {
      const updatedThreads = threads?.map((thread) => {
        if (thread.id !== id) return thread;

        const newUpVotesBy = thread.upVotesBy.includes(profile.id)
          ? thread.upVotesBy.filter((userId) => userId !== profile.id)
          : thread.upVotesBy;

        const newDownVotesBy = thread.downVotesBy.includes(profile.id)
          ? thread.downVotesBy.filter((userId) => userId !== profile.id)
          : thread.downVotesBy;

        return {
          ...thread,
          upVotesBy: newUpVotesBy,
          downVotesBy: newDownVotesBy,
        };
      });

      dispatch(threadsSlice.actions.setThreads(updatedThreads));

      dispatch(showLoading());
      await api.neutralizeVoteThread(id);
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const createThread = createAsyncThunk(
  'threads/createThread',
  async (
    { title, body, category }: { title: string; body: string, category: string | undefined },
    { getState, dispatch, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const profile = state.profile.profile;

    if (!profile) throw new Error('User not authenticated');

    try {
      dispatch(showLoading());
      await api.createThread({
        title: title,
        body: body,
        category: category,
      });
      await dispatch(fetchThreads());
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      return rejectWithValue(error);
    }
  }
);

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.threads = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchThreads.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createThread.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createThread.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createThread.rejected, (state) => {
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
      });
  },
});

export default threadsSlice.reducer;
