// __mocks__/api.ts
export default {
  getAllThreads: jest.fn(),
  createThread: jest.fn(),
  upVoteThread: jest.fn(),
  downVoteThread: jest.fn(),
  neutralizeVoteThread: jest.fn(),
};
