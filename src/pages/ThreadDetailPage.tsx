import { useParams } from "react-router";
import { useEffect } from "react";
import { assertString } from "../utils/asserts";
import CommentForm from "../components/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { createComment1, downVoteComment, fetchThreadDetail2, upVoteComment } from "../states/threadDetail/threadDetailSlice";

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { thread, status } = useSelector((state: RootState) => state.threadDetail);

  useEffect(() => {
    if (status === "idle") {
      assertString(id);
      dispatch(fetchThreadDetail2(id));
    }
  }, [dispatch, status, id]);

  if (!thread) return <p>Loading...</p>;

  const onUpvoteClickHandler = async (commentId: string) => {
    assertString(id);
    dispatch(upVoteComment({threadId: id, commentId}));
  };

  const onDevoteClickHandler = async (commentId: string) => {
    assertString(id);
    dispatch(downVoteComment({threadId: id, commentId}));
  };

  const createComment = async (content: string) => {
    assertString(id);
    dispatch(createComment1({ threadId: id, commentContent: content }));
  };

  if (status === "loading" && status === "loading") return <p>Loading....</p>;
  if (status === "failed" && status === "failed") return <p>Failed to load thread detail</p>;

  return (
    <>
      <main className="flex flex-1 flex-col p-4 justify-center">
        <div key={thread.id}>
          <h3>{thread.title}</h3>
          <h3>{thread.body}</h3>
          <h3>{thread.createdAt}</h3>
          <h3>{thread.owner.name}</h3>
          <h3>{thread.owner.avatar}</h3>
        </div>

        <h2>Comments ({thread.comments.length})</h2>
        <CommentForm createComment={createComment} />
        {thread.comments.map((comment) => (
          <div key={comment.id}>
            <h5>{comment.owner.name}</h5>
            <h5>{comment.owner.avatar}</h5>
            <h3>{comment.content}</h3>
            <h3>{comment.createdAt}</h3>
            <button onClick={() => onUpvoteClickHandler(comment.id)}>
              {comment.upVotesBy.length} Upvote
            </button>
            <button
              onClick={() => onDevoteClickHandler(comment.id)}
              className="ml-4"
            >
              {comment.downVotesBy.length} Devote
            </button>
          </div>
        ))}
      </main>
    </>
  );
}

export default ThreadDetailPage;
