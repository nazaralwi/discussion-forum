/**
 * - Thread Item
 *  - renders thread title, body, owner name, and comments count
 *  - calls upVote and downVote when buttons are clicked
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThreadItem from './ThreadItem';
import { BrowserRouter } from 'react-router-dom';

const mockThread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: '<p>This is a test body</p>',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 2,
  category: 'general',
  createdAt: new Date().toISOString(),
};

const mockUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://example.com/avatar.jpg',
  },
];

describe('ThreadItem Component', () => {
  it('renders thread title, body, owner name, and comments count', () => {
    render(
      <BrowserRouter>
        <ThreadItem
          users={mockUsers}
          profile={mockUsers[0]}
          thread={mockThread}
          upVote={() => {}}
          downVote={() => {}}
          neutralizeVoteThread={() => {}}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Thread')).toBeInTheDocument();
    expect(screen.getByText('This is a test body')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/2 Comments/)).toBeInTheDocument();
    expect(screen.getByText('#GENERAL')).toBeInTheDocument();
  });

  it('calls upVote and downVote when buttons are clicked', async () => {
    const upVoteMock = vi.fn();
    const downVoteMock = vi.fn();
    const neutralizeMock = vi.fn();

    render(
      <BrowserRouter>
        <ThreadItem
          users={mockUsers}
          profile={mockUsers[0]}
          thread={mockThread}
          upVote={upVoteMock}
          downVote={downVoteMock}
          neutralizeVoteThread={neutralizeMock}
        />
      </BrowserRouter>
    );

    const likeButton = screen.getByTestId('upvote-button');
    fireEvent.click(likeButton);
    expect(upVoteMock).toHaveBeenCalledWith('thread-1');

    const dislikeButton = screen.getByTestId('downvote-button');
    fireEvent.click(dislikeButton);
    expect(downVoteMock).toHaveBeenCalledWith('thread-1');
  });
});
