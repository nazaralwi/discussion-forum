import {
  RegisterParams,
  LoginParams,
  CreateThreadParams,
  User,
  RegisterResponse,
  LoginResponse,
  ThreadResponse,
  ThreadsResponse,
  UserResponse,
  LeaderboardsResponse,
  ThreadDetailResponse,
  Thread,
  UpvoteThreadResponse,
  Vote,
  ThreadDetail,
  Leaderboard,
  ThreadComment,
  ThreadCommentResponse,
  ProfileResponse,
} from "./models";

const api = (() => {
  const BASE_URL = "https://forum-api.dicoding.dev/v1";

  async function _fetchWithAuth(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }

  function deleteAccessToken(): void {
    localStorage.removeItem("accessToken");
  }

  function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  async function register({
    name,
    email,
    password,
  }: RegisterParams): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJSON: RegisterResponse = await response.json();
    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJSON;

    return user;
  }

  async function login({ email, password }: LoginParams): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJSON: LoginResponse = await response.json();
    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJSON;

    return token;
  }

  async function getOwnProfile(): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJSON: ProfileResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJSON;

    return user;
  }

  async function createThread({
    title,
    body,
  }: CreateThreadParams): Promise<Thread> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const responseJSON: ThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJSON;

    return thread;
  }

  async function upVoteThread(threadId: string): Promise<Vote> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseJSON: UpvoteThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJSON;

    return vote;
  }

  async function downVoteThread(threadId: string): Promise<Vote> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseJSON: UpvoteThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJSON;

    return vote;
  }

  async function upVoteComment(
    threadId: string,
    commentId: string,
  ): Promise<Vote> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseJSON: UpvoteThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJSON;

    return vote;
  }

  async function downVoteComment(
    threadId: string,
    commentId: string,
  ): Promise<Vote> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseJSON: UpvoteThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { vote },
    } = responseJSON;

    return vote;
  }

  async function createComment(
    threadId: string,
    content: string,
  ): Promise<ThreadComment> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    const responseJSON: ThreadCommentResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJSON;

    return comment;
  }

  async function getAllThreads(): Promise<Thread[]> {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJSON: ThreadsResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJSON;

    return threads;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJSON: UserResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJSON;

    return users;
  }

  async function getAllLeaderboards(): Promise<Leaderboard[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJSON: LeaderboardsResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJSON;

    return leaderboards;
  }

  async function getThreadDetail(id: string): Promise<ThreadDetail> {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJSON: ThreadDetailResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJSON;

    return detailThread;
  }

  return {
    putAccessToken,
    deleteAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    createThread,
    upVoteThread,
    downVoteThread,
    upVoteComment,
    downVoteComment,
    createComment,
    getAllThreads,
    getAllUsers,
    getAllLeaderboards,
    getThreadDetail,
  };
})();

export default api;
