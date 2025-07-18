/**
 * - ThreadList
 *  - renders thread items when threads are provided
 *  - renders loading text when threads are empty
 */

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from '@testing-library/react';
import ThreadList from "./ThreadList";
import type { Thread, User } from "../utils/models";

import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// 🔹 Mock untuk ThreadItem
vi.mock("./ThreadItem", () => ({
  default: ({ thread }: { thread: Thread }) => (
    <div data-testid="thread-item">{thread.title}</div>
  ),
}));

const mockUsers: User[] = [
  { id: "user-1", name: "Alice", email: "alice@example.com", avatar: "url1" },
  { id: "user-2", name: "Bob", email: "bob@example.com", avatar: "url2" },
];

const mockThreads: Thread[] = [
  {
    id: "thread-1",
    title: "First Thread",
    body: "<p>Hello</p>",
    category: "General",
    createdAt: "2025-01-01T00:00:00Z",
    ownerId: "user-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Second Thread",
    body: "<p>World</p>",
    category: "General",
    createdAt: "2025-01-02T00:00:00Z",
    ownerId: "user-2",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe("ThreadList Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders thread items when threads are provided", () => {
    render(
      <ThreadList
        users={mockUsers}
        threads={mockThreads}
        upVote={() => {}}
        downVote={() => {}}
        neutralizeVoteThread={() => {}}
      />
    );

    const items = screen.getAllByTestId("thread-item");
    expect(items).toHaveLength(mockThreads.length); 
    expect(screen.getByText("First Thread")).toBeInTheDocument();
    expect(screen.getByText("Second Thread")).toBeInTheDocument();
  });

  it("renders loading text when threads are empty", () => {
    render(
      <ThreadList
        users={mockUsers}
        threads={[]}
        upVote={() => {}}
        downVote={() => {}}
        neutralizeVoteThread={() => {}}
      />
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
