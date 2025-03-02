import { useParams } from "react-router";
import { useEffect } from "react";
import { assertString } from "../utils/asserts";
import CommentForm from "../components/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import {
  createComment1,
  upVoteThread,
  downVoteThread,
  downVoteComment,
  fetchThreadDetail,
  neutralizeVoteThread,
  neutralizeVoteComment,
  upVoteComment,
  resetThreadDetail,
} from "../states/threadDetail/threadDetailSlice";
import DOMPurify from "dompurify";
import { postedAt } from "../utils/formatter";
import { User } from "../utils/models";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

interface ThreadDetailPageProps {
  profile?: User;
}

function ThreadDetailPage({ profile }: ThreadDetailPageProps) {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const threadDetailState = useSelector(
    (state: RootState) => state.threadDetail,
  );
  const userListState = useSelector((state: RootState) => state.userList);
  const isUpVote = profile
    ? threadDetailState.thread?.upVotesBy.includes(profile!.id)
    : false;
  const isDownVote = profile
    ? threadDetailState.thread?.downVotesBy.includes(profile!.id)
    : false;

  assertString(id);

  console.log(id);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));

    return () => {
      dispatch(resetThreadDetail());
    };
  }, [id, dispatch]);

  const onUpvoteThreadClickHandler = async () => {
    if (isUpVote) {
      dispatch(neutralizeVoteThread(id));
    } else {
      dispatch(upVoteThread(id));
    }
  };

  const onDevoteThreadClickHandler = async () => {
    if (isDownVote) {
      dispatch(neutralizeVoteThread(id));
    } else {
      dispatch(downVoteThread(id));
    }
  };

  const onUpvoteClickHandler = async (commentId: string, isUpVote: boolean) => {
    if (isUpVote) {
      dispatch(neutralizeVoteComment({ threadId: id, commentId }));
    } else {
      dispatch(upVoteComment({ threadId: id, commentId }));
    }
  };

  const onDevoteClickHandler = async (
    commentId: string,
    isDownVote: boolean,
  ) => {
    if (isDownVote) {
      dispatch(neutralizeVoteComment({ threadId: id, commentId }));
    } else {
      dispatch(downVoteComment({ threadId: id, commentId }));
    }
  };

  const createComment = async (content: string) => {
    dispatch(createComment1({ threadId: id, commentContent: content }));
  };

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center">
        <div className="w-full p-2 border-2 rounded-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {threadDetailState.thread?.title}
          </h3>
          <h3
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(threadDetailState.thread?.body ?? ""),
            }}
          ></h3>
          <div className="flex items-center gap-1.5 mb-3">
            <img
              src={
                (userListState.userList ?? []).find(
                  (user) => user.id === threadDetailState.thread?.owner.id,
                )?.avatar
              }
              alt="Profile image"
              className="rounded-full w-5 h-5"
            />
            <p>
              {
                (userListState.userList ?? []).find(
                  (user) => user.id === threadDetailState.thread?.owner.id,
                )?.name
              }
            </p>
            <p>ᐧ</p>
            <p>
              {postedAt(new Date(threadDetailState.thread?.createdAt ?? ""))}
            </p>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <button
              onClick={onUpvoteThreadClickHandler}
              className="flex items-center gap-1.5"
            >
              {threadDetailState.thread?.upVotesBy.length}
              {isUpVote ? <AiFillLike /> : <AiOutlineLike />}
            </button>
            <button
              onClick={onDevoteThreadClickHandler}
              className="ml-3 flex items-center gap-1.5"
            >
              {threadDetailState.thread?.downVotesBy.length}
              {isDownVote ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>
            <p className="ml-3">
              {threadDetailState.thread?.comments.length} Comments
            </p>
          </div>
        </div>

        <h2>Comments ({threadDetailState.thread?.comments.length})</h2>
        <CommentForm createComment={createComment} className="mb-8 w-full" />
        {threadDetailState.thread?.comments.map((comment) => {
          const isUpVoteComment = profile
            ? comment.upVotesBy.includes(profile!.id)
            : false;
          const isDownVoteComment = profile
            ? comment.downVotesBy.includes(profile!.id)
            : false;

          return (
            <div
              key={comment.id}
              className="p-2 border-2 rounded-sm mb-8 w-full"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <img
                  src={comment.owner.avatar}
                  alt="Profile image"
                  className="rounded-full w-5 h-5"
                />
                <h5 className="font-bold text-gray-900">
                  {comment.owner.name}
                </h5>
              </div>
              <p
                className="mb-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(comment.content),
                }}
              ></p>
              <p className="mb-3">{postedAt(new Date(comment.createdAt))}</p>
              <div className="flex items-center gap-1.5 mb-3">
                <button
                  onClick={() =>
                    onUpvoteClickHandler(comment.id, isUpVoteComment)
                  }
                  className="flex items-center gap-1.5"
                >
                  {comment.upVotesBy.length}
                  {isUpVoteComment ? <AiFillLike /> : <AiOutlineLike />}
                </button>
                <button
                  onClick={() =>
                    onDevoteClickHandler(comment.id, isDownVoteComment)
                  }
                  className="ml-4 flex items-center gap-1.5"
                >
                  {comment.downVotesBy.length}
                  {isDownVoteComment ? <AiFillDislike /> : <AiOutlineDislike />}
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default ThreadDetailPage;
