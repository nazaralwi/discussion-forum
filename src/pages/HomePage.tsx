import { useEffect } from "react";
import ThreadForm from "../components/ThreadForm";
import ThreadList from "../components/ThreadList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import {
  createThread,
  downVoteThread,
  fetchThreads,
  upVoteThread,
} from "../states/threads/threadsSlice";

interface HomePageProps {
  isAuth: boolean;
}

function HomePage({ isAuth }: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { threads, status } = useSelector((state: RootState) => state.threads);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchThreads());
    }
  }, [dispatch, status]);

  const handleCreateThread = async (title: string, body: string) => {
    dispatch(createThread({ title: title, body: body }));
  };

  const handleUpVote = async (id: string) => {
    console.log("handleUpVote");
    dispatch(upVoteThread(id));
  };

  const handleDownVotes = async (id: string) => {
    console.log("handleDownVote");
    dispatch(downVoteThread(id));
  };

  if (status === "loading") return <p>Loading....</p>;
  if (status === "failed") return <p>Failed to load threads</p>;

  if (!isAuth) {
    return (
      <>
        <main className="flex flex-1 p-4 justify-center">
          <div className="flex flex-col gap-2">
            <ThreadList
              threads={threads ?? []}
              upVote={handleUpVote}
              downVote={handleDownVotes}
            />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="flex flex-1 p-4 justify-center">
        <ThreadForm createThread={handleCreateThread} />
        <div className="flex flex-col gap-2">
          <ThreadList
            threads={threads ?? []}
            upVote={handleUpVote}
            downVote={handleDownVotes}
          />
        </div>
      </main>
    </>
  );
}

export default HomePage;
