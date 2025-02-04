import { Link, useNavigate } from "react-router-dom";
import { Thread, Vote } from "../utils/models";
import api from "../utils/api";

interface ThreadRowProps {
  thread: Thread;
}

function ThreadRow({ thread }: ThreadRowProps) {
  const navigate = useNavigate();

  const onUpvoteClickHandler = async () => {
    const upVoteThreadResponse: Vote = await api.upVoteThread(thread.id);
    console.log(upVoteThreadResponse);
  };

  const onDevoteClickHandler = async () => {
    const downVoteThreadResponse: Vote = await api.downVoteThread(thread.id);
    console.log(downVoteThreadResponse);
  };

  const onCommentClickHandler = () => {
    navigate(`/threads/${thread.id}`);
  };

  return (
    <div key={thread.id} className='p-2 border-2 rounded-sm'>
      <Link to={`/threads/${thread.id}`}>
        <h3 className='text-lg'>{thread.title}</h3>
      </Link>
      <h3>{thread.body}</h3>
      <p>{thread.createdAt}</p>
      <button onClick={onUpvoteClickHandler}>{thread.upVotesBy.length} Upvote</button>
      <button onClick={onDevoteClickHandler} className="ml-4">{thread.downVotesBy.length} Devote</button>
      <button onClick={onCommentClickHandler} className="ml-4">{thread.totalComments} Comments</button>
    </div>
  )
}

export default ThreadRow;