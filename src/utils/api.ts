import {
  RegisterParams,
  LoginParams,
  User,
  RegisterResponse,
  LoginResponse,
  ThreadResponse,
  UserResponse,
  LeaderboardsResponse,
  ThreadDetailResponse,
  Thread
} from "./models";

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }: RegisterParams): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const responseJSON: RegisterResponse = await response.json();
    const { status, message } = responseJSON;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJSON;
    
    return user;
  }

  async function login({ email, password }: LoginParams): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, 
        password
      })
    });

    const responseJSON: LoginResponse = await response.json();
    const { status, message } = responseJSON;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJSON;

    return token;
  }

  async function getAllThreads(): Promise<Thread[]> {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJSON: ThreadResponse = await response.json();

    const { status, message } = responseJSON;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJSON;

    return threads;
  }
  
  async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);
  
    const responseJSON: UserResponse = await response.json();
  
    const { status, message } = responseJSON;
  
    if (status !== 'success') {
      throw new Error(message);
    }
  
    const { data: { users } } = responseJSON;
  
    return users;
  }
  
  async function getAllLeaderboards(): Promise<Leaderboard[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);
  
    const responseJSON: LeaderboardsResponse = await response.json();
  
    const { status, message } = responseJSON;
  
    if (status !== 'success') {
      throw new Error(message);
    }
  
    const { data: { leaderboards } } = responseJSON;
  
    return leaderboards;
  }
  
  async function getThreadDetail(id: string): Promise<ThreadDetail> {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
  
    const responseJSON: ThreadDetailResponse = await response.json();
  
    const { status, message } = responseJSON;
  
    if (status !== 'success') {
      throw new Error(message);
    }
  
    const { data: { detailThread } } = responseJSON;
  
    return detailThread;
  }
  
  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllThreads,
    getAllUsers,
    getAllLeaderboards,
    getThreadDetail
  }
})();

export default api;


