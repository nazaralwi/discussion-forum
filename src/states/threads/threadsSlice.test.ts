/**
 * - Threads Slice
 *  - should handle initial state
 *  - should handle fetchThreads.fulfilled
 *  - should handle createThread.fulfilled
 *  - should handle upVoteThread.fulfilled
 *  - should handle downVoteThread.fulfilled
 *  - should handle neutralizeVoteThread.fulfilled
 */

import { describe, it, expect } from 'vitest';
import { Thread } from '../../utils/models';
import reducer, {
  fetchThreads,
  createThread,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
} from './threadsSlice';
import { ThreadState } from './threadsSlice';

const initialState: ThreadState = {
  threads: null,
  status: 'idle',
};

export const sampleThreads: Thread[] = [
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
  {
    id: 'thread-002',
    title: 'Tips meningkatkan skill debugging JavaScript',
    body: 'Bagaimana cara efektif untuk melacak dan memperbaiki bug di JavaScript?',
    category: 'javascript',
    createdAt: '2025-07-15T12:00:00.000Z',
    ownerId: 'user-124',
    upVotesBy: ['user-888'],
    downVotesBy: [],
    totalComments: 5,
  },
];

describe('threadsSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle fetchThreads.fulfilled', () => {
    const action = {
      type: fetchThreads.fulfilled.type,
      payload: sampleThreads,
    };
    const nextState = reducer(initialState, action);
    expect(nextState.threads).toEqual(sampleThreads);
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle createThread.fulfilled', () => {
    const preState = { ...initialState, threads: [...sampleThreads] };
    const newThread = { ...sampleThreads[0], id: '2' };
    const action = { type: createThread.fulfilled.type, payload: newThread };
    const nextState = reducer(preState, action);
    expect(nextState.threads?.[0].id).toBe('2');
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle upVoteThread.fulfilled', () => {
    const userId = 'user-899';

    const threadsCopy = JSON.parse(JSON.stringify(sampleThreads));
    const targetThread = threadsCopy[0];

    const updatedThread = {
      ...targetThread,
      upVotesBy: [...targetThread.upVotesBy, userId],
    };

    const preState = {
      ...initialState,
      threads: threadsCopy,
    };

    const updatedThreads = threadsCopy.slice();
    updatedThreads[0] = updatedThread;
    const action = {
      type: upVoteThread.fulfilled.type,
      payload: updatedThreads,
    };

    const nextState = reducer(preState, action);

    expect(nextState.status).toBe('succeeded');

    const thread = nextState.threads?.find((t) => t.id === updatedThread.id);
    expect(thread?.upVotesBy).toContain(userId);
    expect(nextState.threads).toHaveLength(sampleThreads.length);
  });

  it('should handle downVoteThread.fulfilled', () => {
    const userId = 'user-988';

    const threadsCopy = JSON.parse(JSON.stringify(sampleThreads));
    const targetThread = threadsCopy[0];

    const updatedThread = {
      ...targetThread,
      downVotesBy: [...targetThread.downVotesBy, userId],
    };

    const preState = {
      ...initialState,
      threads: threadsCopy,
    };

    const updatedThreads = threadsCopy.slice();
    updatedThreads[0] = updatedThread;
    const action = {
      type: downVoteThread.fulfilled.type,
      payload: updatedThreads,
    };

    const nextState = reducer(preState, action);

    expect(nextState.status).toBe('succeeded');

    const thread = nextState.threads?.find((t) => t.id === updatedThread.id);
    expect(thread?.downVotesBy).toContain(userId);
    expect(nextState.threads).toHaveLength(sampleThreads.length);
  });

  it('should handle neutralizeVoteThread.fulfilled', () => {
    const userId = 'user-100';

    const threadsCopy = JSON.parse(JSON.stringify(sampleThreads));
    const targetThread = threadsCopy[0];

    const updatedThread = {
      ...targetThread,
      downVotesBy: targetThread.downVotesBy.filter(
        (userId: string) => userId !== userId
      ),
    };

    const preState = {
      ...initialState,
      threads: threadsCopy,
    };

    const updatedThreads = threadsCopy.slice();
    updatedThreads[0] = updatedThread;
    const action = {
      type: neutralizeVoteThread.fulfilled.type,
      payload: updatedThreads,
    };

    const nextState = reducer(preState, action);

    expect(nextState.status).toBe('succeeded');

    const thread = nextState.threads?.find((t) => t.id === updatedThread.id);
    expect(thread?.downVotesBy).not.toContain(userId);
    expect(nextState.threads).toHaveLength(sampleThreads.length);
  });
});
