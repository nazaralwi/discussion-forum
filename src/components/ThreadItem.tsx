import { Link, useNavigate } from "react-router-dom";
import { Thread } from "../utils/models";

interface ThreadItemProps {
  thread: Thread;
  upVote: (id: string) => void;
  downVote: (id: string) => void;
}

function ThreadItem({ thread, upVote, downVote }: ThreadItemProps) {
  const navigate = useNavigate();

  const onUpvoteClickHandler = async () => {
    upVote(thread.id);
  };

  const onDevoteClickHandler = async () => {
    downVote(thread.id);
  };

  const onCommentClickHandler = () => {
    navigate(`/threads/${thread.id}`);
  };

  return (
    <div className="p-2 border-2 rounded-sm">
      <Link to={`/threads/${thread.id}`}>
        <h3 className="text-lg">{thread.title}</h3>
      </Link>
      <h3>{thread.body}</h3>
      <p>{thread.createdAt}</p>
      <button onClick={onUpvoteClickHandler}>
        {thread.upVotesBy.length} Upvote
      </button>
      <button onClick={onDevoteClickHandler} className="ml-4">
        {thread.downVotesBy.length} Devote
      </button>
      <button onClick={onCommentClickHandler} className="ml-4">
        {thread.totalComments} Comments
      </button>
      <p>{thread.ownerId}</p>
    </div>
  );
}

export default ThreadItem;
