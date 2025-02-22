import { Link, useNavigate } from "react-router-dom";
import { Thread, User } from "../utils/models";
import { postedAt } from "../utils/formatter";
import DOMPurify from 'dompurify';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ThreadItemProps {
  users: User[];
  thread: Thread;
  upVote: (id: string) => void;
  downVote: (id: string) => void;
}

function ThreadItem({ users, thread, upVote, downVote }: ThreadItemProps) {
  const navigate = useNavigate();
  // const isUpVote = thread.upVotesBy.includes

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
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h3>
      </Link>
      <h3 className="mb-3 max-h-32 overflow-hidden text-ellipsis line-clamp-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.body) }}></h3>
      <div className="flex items-center gap-1.5 mb-3">
        <img src={users.find((user) => user.id === thread.ownerId)?.avatar} alt="Profile image" className="rounded-full w-5 h-5" />
        <p>{users.find((user) => user.id === thread.ownerId)?.name}</p>
        <p>ᐧ</p>
        <p>{postedAt(new Date(thread.createdAt))}</p>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <button onClick={onUpvoteClickHandler} className="flex items-center gap-1.5">
          {thread.upVotesBy.length}
          <FaChevronUp />
        </button>
        <button onClick={onDevoteClickHandler} className="ml-3 flex items-center gap-1.5">
          {thread.downVotesBy.length}
          <FaChevronDown />
        </button>
        <button onClick={onCommentClickHandler} className="ml-3">
          {thread.totalComments} Comments
        </button>
      </div>
    </div>
  );
}

export default ThreadItem;
