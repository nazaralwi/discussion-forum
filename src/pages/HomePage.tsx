import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Thread } from '../utils/models';
import api from '../utils/api';
import ThreadForm from '../components/ThreadForm';
import ThreadRow from '../components/ThreadRow';

interface HomePageProps {
  isAuth: boolean;
}

function HomePage({ isAuth }: HomePageProps) {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    async function fetchThreads() {
      try {
        const threads: Thread[] = await api.getAllThreads();
        setThreads(threads);
      } catch (error) {
        console.log("Error: " + (error as Error).message);
      }
    }

    fetchThreads();
  });

  if (!isAuth) {
    return (
      <>
        <main className="flex flex-1 p-4 justify-center">
          <div className='flex flex-col gap-2'>
            {
              threads.length > 0 ? (
                threads.map((thread) => (
                  <ThreadRow thread={thread} />
                ))
              ) : (
                <p>Loading...</p>
              )
            }
          </div>
        </main>
      </>
    );  
  }

  return (
    <>
      <main className="flex flex-1 p-4 justify-center">
        <ThreadForm />
        <div className='flex flex-col gap-2'>
          {
            threads.length > 0 ? (
              threads.map((thread) => (
                <ThreadRow thread={thread} />
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      </main>
    </>
  );
}

export default HomePage;