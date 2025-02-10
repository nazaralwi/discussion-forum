import { useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { ThreadComment, ThreadDetail } from "../utils/models";
import { assertString } from "../utils/asserts";
import CommentForm from "../components/CommentForm";

function ThreadDetailPage() {
  const { id } = useParams();
  const [thread, setThread] = useState<ThreadDetail | null>(null);

  useEffect(() => {
    async function fetchThreadDetail() {
      assertString(id);
      const threadDetail = await api.getThreadDetail(id);
      setThread(threadDetail);
    }

    fetchThreadDetail();
  }, [id]);

  if (!thread) return <p>Loading...</p>;

  const onUpvoteClickHandler = async (commentId: string) => {
    if (!thread) return;

    const profile = await api.getOwnProfile();

    const originalComments = thread.comments;
    const updatedComments = thread.comments.map((comment) => {
      if (comment.id === commentId) {
        const hasUpvoted = comment.upVotesBy.includes(profile.id);
        const hasDownvoted = comment.downVotesBy.includes(profile.id);

        return {
          ...comment,
          upVotesBy: hasUpvoted
            ? comment.upVotesBy.filter((userId) => userId !== profile.id)
            : [...comment.upVotesBy, profile.id],
          downVotesBy: hasDownvoted
            ? comment.downVotesBy.filter((userId) => userId !== profile.id)
            : comment.downVotesBy,
        };
      }

      return comment;
    });

    setThread({ ...thread, comments: updatedComments });

    try {
      await api.upVoteComment(thread.id, commentId);
    } catch (error) {
      console.log(error);
      setThread({ ...thread, comments: originalComments });
    }
  };

  const onDevoteClickHandler = async (commentId: string) => {
    if (!thread) return;

    const profile = await api.getOwnProfile();

    const updatedComments = thread.comments.map((comment) => {
      if (comment.id === commentId) {
        const hasUpvoted = comment.upVotesBy.includes(profile.id);
        const hasDownvoted = comment.downVotesBy.includes(profile.id);

        return {
          ...comment,
          upVotesBy: hasUpvoted
            ? comment.upVotesBy.filter((userId) => userId !== profile.id)
            : comment.upVotesBy,
          downVotesBy: hasDownvoted
            ? comment.downVotesBy.filter((userId) => userId !== profile.id)
            : [...comment.downVotesBy, profile.id],
        };
      }

      return comment;
    });

    setThread({ ...thread, comments: updatedComments });

    try {
      await api.downVoteComment(thread.id, commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (content: string) => {
    assertString(id);
    const profile = await api.getOwnProfile();

    const comment: ThreadComment = {
      id: (+new Date()).toString(),
      content,
      createdAt: new Date().toISOString(),
      owner: profile,
      upVotesBy: [],
      downVotesBy: [],
    };
    const comments = thread.comments;
    comments.unshift(comment);
    setThread({ ...thread, comments: comments });
    const createContentResponse = await api.createComment(id, content);
    console.log(createContentResponse);
  };

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
