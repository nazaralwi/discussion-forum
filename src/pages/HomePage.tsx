import { useEffect } from "react";
import ThreadForm from "../components/ThreadForm";
import ThreadList from "../components/ThreadList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import {
  createThread,
  downVoteThread,
  fetchThreads,
  neutralizeVoteThread,
  upVoteThread,
} from "../states/threads/threadsSlice";
import { User } from "../utils/models";

interface HomePageProps {
  isAuth: boolean;
  profile?: User;
}

function HomePage({ isAuth, profile }: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const threadState = useSelector((state: RootState) => state.threads);
  const { userList } = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    if (threadState.status === "idle") {
      dispatch(fetchThreads());
    }
  }, [dispatch, threadState.status]);

  const handleCreateThread = async (title: string, body: string) => {
    dispatch(createThread({ title: title, body: body }));
  };

  const handleUpVote = async (id: string) => {
    dispatch(upVoteThread(id));
  };

  const handleDownVotes = async (id: string) => {
    dispatch(downVoteThread(id));
  };

  const handleNeutralizeVoteThread = async (id: string) => {
    dispatch(neutralizeVoteThread(id));
  };

  if (!isAuth) {
    return (
      <>
        <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 justify-center">
          <div className="flex flex-col gap-2">
            <ThreadList
              users={userList ?? []}
              threads={threadState.threads ?? []}
              upVote={handleUpVote}
              downVote={handleDownVotes}
              neutralizeVoteThread={handleNeutralizeVoteThread}
            />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center justify-center">
        <ThreadForm createThread={handleCreateThread} className="mb-4" />
        <div className="flex flex-col gap-2">
          <ThreadList
            users={userList ?? []}
            threads={threadState.threads ?? []}
            profile={profile}
            upVote={handleUpVote}
            downVote={handleDownVotes}
            neutralizeVoteThread={handleNeutralizeVoteThread}
          />
        </div>
      </main>
    </>
  );
}

export default HomePage;
