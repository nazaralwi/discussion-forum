import { Link, useNavigate } from 'react-router-dom';
import { Thread, User } from '../utils/models';
import { postedAt } from '../utils/formatter';
import DOMPurify from 'dompurify';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';

interface ThreadItemProps {
  users: User[];
  profile?: User;
  thread: Thread;
  upVote: (id: string) => void;
  downVote: (id: string) => void;
  neutralizeVoteThread: (id: string) => void;
}

function ThreadItem({
  users,
  profile,
  thread,
  upVote,
  downVote,
  neutralizeVoteThread,
}: ThreadItemProps) {
  const navigate = useNavigate();
  const isUpVote = profile ? thread.upVotesBy.includes(profile!.id) : false;
  const isDownVote = profile ? thread.downVotesBy.includes(profile!.id) : false;

  const onUpvoteClickHandler = async () => {
    if (isUpVote) {
      neutralizeVoteThread(thread.id);
    } else {
      upVote(thread.id);
    }
  };

  const onDevoteClickHandler = async () => {
    if (isDownVote) {
      neutralizeVoteThread(thread.id);
    } else {
      downVote(thread.id);
    }
  };

  const onCommentClickHandler = () => {
    navigate(`/threads/${thread.id}`);
  };

  return (
    <div id="thread-item" className="p-4 rounded-md shadow-sm border border-neutral-200 bg-white">
      <Link to={`/threads/${thread.id}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {thread.title}
        </h3>
      </Link>
      <h3
        className="mb-3 max-h-32 overflow-hidden text-ellipsis line-clamp-3"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(thread.body),
        }}
      ></h3>
      <div className="flex items-center gap-1.5 mb-3">
        <img
          src={users.find((user) => user.id === thread.ownerId)?.avatar}
          alt="Profile image"
          className="rounded-full w-5 h-5"
        />
        <p>{users.find((user) => user.id === thread.ownerId)?.name}</p>
        <p>ᐧ</p>
        <p>{postedAt(new Date(thread.createdAt))}</p>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <button
          id='upvote-button'
          data-testid='upvote-button'
          onClick={onUpvoteClickHandler}
          className="flex items-center gap-1.5"
        >
          {thread.upVotesBy.length}
          {isUpVote ? <AiFillLike /> : <AiOutlineLike />}
        </button>
        <button
          id='downvote-button'
          data-testid='downvote-button'
          onClick={onDevoteClickHandler}
          className="ml-3 flex items-center gap-1.5"
        >
          {thread.downVotesBy.length}
          {isDownVote ? <AiFillDislike /> : <AiOutlineDislike />}
        </button>
        <button onClick={onCommentClickHandler} className="ml-3">
          {thread.totalComments} Comments
        </button>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <p>#{thread.category.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default ThreadItem;
