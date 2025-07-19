import { Thread, User } from '../utils/models';
import ThreadItem from './ThreadItem';

interface ThreadListProps {
  users: User[];
  threads: Thread[];
  profile?: User;
  upVote: (id: string) => void;
  downVote: (id: string) => void;
  neutralizeVoteThread: (id: string) => void;
}

function ThreadList({
  users,
  threads,
  profile,
  upVote,
  downVote,
  neutralizeVoteThread,
}: ThreadListProps) {
  return (
    <>
      {threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            users={users}
            profile={profile}
            thread={thread}
            upVote={upVote}
            downVote={downVote}
            neutralizeVoteThread={neutralizeVoteThread}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ThreadList;
export type { ThreadListProps };
