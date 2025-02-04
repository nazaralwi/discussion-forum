export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface CreateThreadParams {
  title: string;
  body: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface RegisterResponse {
  status: "success" | "failure";
  message: string;
  data: {
    user: User;
  }
}

export interface LoginResponse {
  status: "success" | "failure";
  message: string;
  data: {
    token: string;
  }
}

export interface ThreadResponse {
  status: "success" | "failure";
  message: string;
  data: {
    thread: Thread;
  }
}

export interface ThreadsResponse {
  status: "success" | "failure";
  message: string;
  data: {
    threads: Thread[];
  }
}

export interface UpvoteThreadResponse {
  status: "success" | "failure";
  message: string;
  data: {
    vote: Vote;
  }
}

export interface UserResponse {
  status: "success" | "failure";
  message: "ok";
  data: {
    users: User[];
  }
}

export interface LeaderboardsResponse {
  status: "success" | "failure";
  message: "ok";
  data: {
    leaderboards: Leaderboard[];
  }
}

export interface ThreadDetailResponse {
  status: "success" | "failure";
  message: "ok";
  data: {
    detailThread: ThreadDetail;
  }
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: User[];
  downVotesBy: User[];
  totalComments: number;
}

export interface ThreadDetail {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: User;
  upVotesBy: User[];
  downVotesBy: User[];
  comments: Comment[];
}

export interface Vote {
  id: string;
  userId: string;
  threadId: string;
  voteType: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: User;
  upVotesBy: User[];
  downVotesBy: User[];
}

export interface Leaderboard {
  user: User;
  score: number;
}
