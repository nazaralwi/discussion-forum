import { Thread, User } from './models';

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Diana Martinez',
    email: 'diana.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'Ethan Brown',
    email: 'ethan.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export const dummyThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'How to learn React effectively?',
    body: 'I’ve been learning React for a while, but I still find it hard to structure large apps. Any advice?',
    category: 'react',
    createdAt: new Date('2025-09-20T10:15:00Z').toISOString(),
    ownerId: dummyUsers[0].id,
    upVotesBy: [dummyUsers[1].id, dummyUsers[2].id],
    downVotesBy: [],
    totalComments: 3,
  },
  {
    id: 'thread-2',
    title: 'Best practices for Redux Toolkit',
    body: 'Do you prefer slices per feature or per domain? Share your thoughts and experiences!',
    category: 'redux',
    createdAt: new Date('2025-09-22T14:30:00Z').toISOString(),
    ownerId: dummyUsers[2].id,
    upVotesBy: [dummyUsers[0].id],
    downVotesBy: [dummyUsers[3].id],
    totalComments: 5,
  },
  {
    id: 'thread-3',
    title: 'Understanding TypeScript generics',
    body: 'Can someone explain when to use generics and how to make them readable?',
    category: 'typescript',
    createdAt: new Date('2025-09-25T08:45:00Z').toISOString(),
    ownerId: dummyUsers[1].id,
    upVotesBy: [dummyUsers[0].id, dummyUsers[3].id, dummyUsers[4].id],
    downVotesBy: [],
    totalComments: 2,
  },
  {
    id: 'thread-4',
    title: 'Deployment tips for Vercel + GitHub Actions',
    body: 'My app works locally but fails to deploy. What are common pitfalls I should check?',
    category: 'deployment',
    createdAt: new Date('2025-09-28T16:10:00Z').toISOString(),
    ownerId: dummyUsers[4].id,
    upVotesBy: [],
    downVotesBy: [dummyUsers[2].id],
    totalComments: 4,
  },
];
