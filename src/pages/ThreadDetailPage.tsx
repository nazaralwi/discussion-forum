import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { assertString } from "../utils/asserts";
import CommentForm from "../components/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { createComment1, downVoteComment, fetchThreadDetail2, upVoteComment } from "../states/threadDetail/threadDetailSlice";
import DOMPurify from 'dompurify';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { postedAt } from "../utils/formatter";
import { downVoteThread, upVoteThread } from "../states/threads/threadsSlice";
import { fetchUserList } from "../states/userlist/userListSlice";

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { thread, status } = useSelector((state: RootState) => state.threadDetail);
  const { userList, userListStatus } = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    if (status === "idle") {
      assertString(id);
      dispatch(fetchThreadDetail2(id));
      dispatch(fetchUserList());
    }

    return () => {
      if (status !== "idle") {
        dispatch({ type: "RESET_STATE" });
      }
    }
  }, [status, id, dispatch]);

  if (!thread) return <p>Loading...</p>;

  const onUpvoteThreadClickHandler = async () => {
    assertString(id);
    dispatch(upVoteThread(id));
  };

  const onDevoteThreadClickHandler = async () => {
    assertString(id);
    dispatch(downVoteThread(id));
  };

  const onUpvoteClickHandler = async (commentId: string) => {
    assertString(id);
    dispatch(upVoteComment({ threadId: id, commentId }));
  };

  const onDevoteClickHandler = async (commentId: string) => {
    assertString(id);
    dispatch(downVoteComment({ threadId: id, commentId }));
  };

  const createComment = async (content: string) => {
    assertString(id);
    dispatch(createComment1({ threadId: id, commentContent: content }));
  };

  if (status === "loading" && status === "loading") return <p>Loading....</p>;
  if (status === "failed" && status === "failed") return <p>Failed to load thread detail</p>;

  return (
    <>
      <main className="w-1/2 mx-auto flex flex-1 p-4 flex-col items-center">
        <div className="w-full p-2 border-2 rounded-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h3>
          <h3 className="mb-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.body) }}></h3>
          <div className="flex items-center gap-1.5 mb-3">
            <img src={(userList ?? []).find((user) => user.id === thread.owner.id)?.avatar} alt="Profile image" className="rounded-full w-5 h-5" />
            <p>{(userList ?? []).find((user) => user.id === thread.owner.id)?.name}</p>
            <p>ᐧ</p>
            <p>{postedAt(new Date(thread.createdAt))}</p>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <button onClick={onUpvoteThreadClickHandler} className="flex items-center gap-1.5">
              {thread.upVotesBy.length}
              <FaChevronUp />
            </button>
            <button onClick={onDevoteThreadClickHandler} className="ml-3 flex items-center gap-1.5">
              {thread.downVotesBy.length}
              <FaChevronDown />
            </button>
            <p className="ml-3">
              {thread.comments.length} Comments
            </p>
          </div>
        </div>

        <h2>Comments ({thread.comments.length})</h2>
        <CommentForm createComment={createComment} className="mb-8 w-full" />
        {thread.comments.map((comment) => (
          <div key={comment.id} className="p-2 border-2 rounded-sm mb-8 w-full">
            <div className="flex items-center gap-1.5 mb-3">
              <img src={comment.owner.avatar} alt="Profile image" className="rounded-full w-5 h-5" />
              <h5 className="font-bold text-gray-900">{comment.owner.name}</h5>
            </div>
            <p className="mb-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}></p>
            <p className="mb-3">{postedAt(new Date(comment.createdAt))}</p>
            <div className="flex items-center gap-1.5 mb-3">
              <button onClick={() => onUpvoteClickHandler(comment.id)} className="flex items-center gap-1.5">
                {comment.upVotesBy.length}
                <FaChevronUp />
              </button>
              <button
                onClick={() => onDevoteClickHandler(comment.id)}
                className="ml-4 flex items-center gap-1.5"
              >
                {comment.downVotesBy.length}
                <FaChevronDown />
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default ThreadDetailPage;
