import { Thread, User } from "../utils/models";
import ThreadItem from "./ThreadItem";

interface ThreadListProps {
  users: User[];
  threads: Thread[];
  upVote: (id: string) => void;
  downVote: (id: string) => void;
}

function ThreadList({ users, threads, upVote, downVote }: ThreadListProps) {
  return (
    <>
      {threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            users={users}
            thread={thread}
            upVote={upVote}
            downVote={downVote}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ThreadList;
