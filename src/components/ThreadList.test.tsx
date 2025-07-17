import { render, screen, fireEvent } from "@testing-library/react";
import ThreadItem from "../components/ThreadItem";
import { BrowserRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockThread = {
  id: "thread-1",
  title: "Sample Thread",
  body: "<p>This is the <strong>body</strong></p>",
  category: "general",
  createdAt: new Date().toISOString(),
  ownerId: "user-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
};

const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.png",
  },
];

describe("ThreadItem Component", () => {
  it("renders thread title and sanitized body", () => {
    render(
      <BrowserRouter>
        <ThreadItem
          users={mockUsers}
          profile={mockUsers[0]}
          thread={mockThread}
          upVote={jest.fn()}
          downVote={jest.fn()}
          neutralizeVoteThread={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sample Thread/i)).toBeInTheDocument();
    expect(screen.getByText(/This is the/i)).toBeInTheDocument();
  });

  it("shows avatar and username", () => {
    render(
      <BrowserRouter>
        <ThreadItem
          users={mockUsers}
          profile={mockUsers[0]}
          thread={mockThread}
          upVote={jest.fn()}
          downVote={jest.fn()}
          neutralizeVoteThread={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText(/Profile image/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("calls upVote and downVote handlers on button click", async () => {
    const upVoteMock = jest.fn();
    const downVoteMock = jest.fn();
    const neutralizeMock = jest.fn();

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

    const upvoteButton = screen.getAllByRole("button")[0];
    const downvoteButton = screen.getAllByRole("button")[1];

    fireEvent.click(upvoteButton);
    expect(upVoteMock).toHaveBeenCalledWith("thread-1");

    fireEvent.click(downvoteButton);
    expect(downVoteMock).toHaveBeenCalledWith("thread-1");
  });

  it("navigates to thread detail on comment click", () => {
    render(
      <BrowserRouter>
        <ThreadItem
          users={mockUsers}
          profile={mockUsers[0]}
          thread={mockThread}
          upVote={jest.fn()}
          downVote={jest.fn()}
          neutralizeVoteThread={jest.fn()}
        />
      </BrowserRouter>
    );

    const commentButton = screen.getByText(/3 Comments/i);
    fireEvent.click(commentButton);
    expect(mockNavigate).toHaveBeenCalledWith("/threads/thread-1");
  });
});
