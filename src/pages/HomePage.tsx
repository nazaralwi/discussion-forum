import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Thread } from '../utils/models';
import api from '../utils/api';

function HomePage() {
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

  return (
    <>
      <main className="flex flex-1 p-4 justify-center">
        <div className='flex flex-col gap-2'>
          {
            threads.length > 0 ? (
              threads.map((thread) => (
                <div key={thread.id} className='p-2 border-2 rounded-sm'>
                  <Link to={`/threads/${thread.id}`}>
                    <h3 className='text-lg'>{thread.title}</h3>
                  </Link>
                  <h3>{thread.body}</h3>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      </main>
    </>
  )
}

export default HomePage;