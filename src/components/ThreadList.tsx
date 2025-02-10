import { Thread } from "../utils/models";
import ThreadItem from "./ThreadItem";

interface ThreadListProps {
  threads: Thread[];
  upVote: (id: string) => void;
  downVote: (id: string) => void;
}

function ThreadList({ threads, upVote, downVote }: ThreadListProps) {
  return (
    <>
      {threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
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
