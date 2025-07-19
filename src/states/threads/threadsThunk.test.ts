/**
 * - fetchThreads Thunk
 *   - dispatches fulfilled when successful
 *   - dispatches rejected when failing
 * - upVoteThread Thunk
 *   - dispatches fulfilled when upvote succeeds
 *   - dispatches rejected when failing
 *
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { fetchThreads, upVoteThread } from './threadsSlice';
import api from '../../utils/api';

vi.mock('../../utils/api');

describe('fetchThreads thunk', () => {
  const mockThreads = [
    {
      id: 'thread-001',
      title: 'Bagaimana cara belajar Redux Toolkit?',
      body: 'Saya ingin memahami Redux Toolkit. Apa langkah pertama yang harus saya ambil?',
      category: 'programming',
      createdAt: '2025-07-16T08:00:00.000Z',
      ownerId: 'user-123',
      upVotesBy: ['user-456', 'user-789'],
      downVotesBy: ['user-321'],
      totalComments: 3,
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('dispatches fulfilled when successful', async () => {
    (api.getAllThreads as Mock).mockResolvedValueOnce(mockThreads);

    const store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.fulfilled.type);
    expect(result.payload).toEqual(mockThreads);
  });

  it('dispatches rejected when failing', async () => {
    const error = new Error('an error');
    (api.getAllThreads as Mock).mockRejectedValueOnce(error);

    const store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.rejected.type);
  });
});

describe('upVoteThread thunk', () => {
  const mockThreadId = 'thread-001';
  const mockThreads = [
    {
      id: 'thread-001',
      title: 'Bagaimana cara belajar Redux Toolkit?',
      body: 'Saya ingin memahami Redux Toolkit. Apa langkah pertama yang harus saya ambil?',
      category: 'programming',
      createdAt: '2025-07-16T08:00:00.000Z',
      ownerId: 'user-123',
      upVotesBy: ['user-456', 'user-789'],
      downVotesBy: ['user-321'],
      totalComments: 3,
    },
  ];

  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('dispatches fulfilled when upvote succeeds', async () => {
    (api.upVoteThread as Mock).mockResolvedValueOnce(undefined);
    (api.getAllThreads as Mock).mockResolvedValueOnce(mockThreads);

    mockGetState.mockReturnValue({
      profile: { profile: { id: 'user-1', name: 'John' } },
    });

    const thunk = upVoteThread(mockThreadId);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(api.upVoteThread).toHaveBeenCalledWith(mockThreadId);
    expect(api.getAllThreads).toHaveBeenCalled();

    expect(result.payload).toEqual(mockThreads);
    expect(result.type).toBe(upVoteThread.fulfilled.type);
  });

  it('dispatches rejected when failing', async () => {
    const error = new Error('API Error');
    (api.upVoteThread as Mock).mockRejectedValueOnce(error);

    mockGetState.mockReturnValue({
      profile: { profile: { id: 'user-1' } },
    });

    const thunk = upVoteThread(mockThreadId);
    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(api.upVoteThread).toHaveBeenCalledWith(mockThreadId);

    expect(result.payload).toBe(error);
    expect(result.type).toBe(upVoteThread.rejected.type);
  });
});
