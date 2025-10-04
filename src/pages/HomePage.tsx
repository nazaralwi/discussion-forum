import { useEffect, useState } from 'react';
import ThreadList from '../components/ThreadList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states';
import {
  downVoteThread,
  fetchThreads,
  neutralizeVoteThread,
  upVoteThread,
} from '../states/threads/threadsSlice';
import { User } from '../utils/models';

interface HomePageProps {
  isAuth: boolean;
  profile?: User;
}

function HomePage({ isAuth, profile }: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const threadState = useSelector((state: RootState) => state.threads);
  const userListState = useSelector((state: RootState) => state.userList);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (threadState.status === 'idle') {
      dispatch(fetchThreads());
    }
  }, [dispatch, threadState.status]);

  useEffect(() => {
    if (threadState.threads) {
      const uniqueCategories = Array.from(
        new Set(threadState.threads.map((thread) => thread.category))
      );
      setCategories(uniqueCategories);
    }
  }, [threadState.threads]);

  const handleUpVote = async (id: string) => {
    dispatch(upVoteThread(id));
  };

  const handleDownVotes = async (id: string) => {
    dispatch(downVoteThread(id));
  };

  const handleNeutralizeVoteThread = async (id: string) => {
    dispatch(neutralizeVoteThread(id));
  };

  const filteredThread =
    selectedCategory && selectedCategory !== ''
      ? threadState.threads?.filter((thread) => thread.category === selectedCategory)
      : threadState.threads;

  if (threadState.status === 'loading' && userListState.status == 'loading') {
    return (
      <>
        <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center justify-start">
          <div className='w-full flex justify-end mb-2'>
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>Loading...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center justify-start">
        <div className='w-full flex justify-end mb-2'>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          {
            (threadState.status === 'loading' && userListState.status == 'loading')
              ? <p>Loading...</p>
              : <ThreadList
                users={userListState.userList ?? []}
                threads={filteredThread ?? []}
                profile={isAuth ? profile : undefined}
                upVote={handleUpVote}
                downVote={handleDownVotes}
                neutralizeVoteThread={handleNeutralizeVoteThread} />
          }
        </div>
      </main>
    </>
  );
}

export default HomePage;
