/**
 * - Thread Thunk
 *  - dispatches fulfilled when successful
 *  - dispatches rejected when failing
 */

import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadsReducer, { fetchThreads } from './threadsSlice';
import * as apiModule from '../../utils/api';

describe('fetchThreads thunk', () => {
  it('dispatches fulfilled when successful', async () => {
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

    const spy = vi.spyOn(apiModule.default, 'getAllThreads').mockResolvedValueOnce(mockThreads);

    const store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.fulfilled.type);
    expect(result.payload).toEqual(mockThreads);

    spy.mockRestore();
  });

  it('dispatches rejected when failing', async () => {
    const anError = new Error("an error");
    const spy = vi.spyOn(apiModule.default, 'getAllThreads').mockRejectedValue(anError);

    const store = configureStore({
      reducer: {
        threads: threadsReducer,
      },
    });

    const result = await store.dispatch(fetchThreads());

    expect(result.type).toBe(fetchThreads.rejected.type);
    expect(anError.message).toEqual("an error");

    spy.mockRestore();
  });
});
