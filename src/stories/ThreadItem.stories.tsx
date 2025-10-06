import { useState } from 'react';
import ThreadItem from '../components/ThreadItem';
import { dummyThreads, dummyUsers } from '../utils/dummies';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
};

export default stories;

const WithUnauthorizedUser = (args: typeof ThreadItem.arguments) => (
  <ThreadItem {...args} />
);

WithUnauthorizedUser.args = {
  users: dummyUsers,
  profile: undefined,
  thread: dummyThreads[0],
  upVote: () => {},
  downVote: () => {},
  neutralizeVoteThread: () => {},
  onCommentClick: () => {},
  onTitleClick: () => {},
};

const WithAuthorizedUser = () => {
  const [thread, setThread] = useState(dummyThreads[0]);
  const profile = dummyUsers[0];

  const upVote = () => {
    setThread((prev) => {
      const isUpVoted = prev.upVotesBy.includes(profile.id);
      const newUpVotesBy = isUpVoted
        ? prev.upVotesBy.filter((userId) => userId !== profile.id)
        : [...prev.upVotesBy, profile.id];

      const newDownVotesBy = prev.downVotesBy.filter(
        (userId) => userId !== profile.id
      );

      return {
        ...prev,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };
    });
  };

  const downVote = () => {
    setThread((prev) => {
      const isDownVoted = prev.downVotesBy.includes(profile.id);
      const newUpVotesBy = prev.upVotesBy.filter(
        (userId) => userId !== profile.id
      );

      const newDownVotesBy = isDownVoted
        ? prev.downVotesBy.filter((userId) => userId !== profile.id)
        : [...prev.downVotesBy, profile.id];

      return {
        ...prev,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };
    });
  };

  const neutralizeVote = () => {
    setThread((prev) => {
      const isUpVoted = prev.upVotesBy.includes(profile.id);
      const isDownVoted = prev.downVotesBy.includes(profile.id);

      const newUpVotesBy = isUpVoted
        ? prev.upVotesBy.filter((userId) => userId !== profile.id)
        : prev.upVotesBy;

      const newDownVotesBy = isDownVoted
        ? prev.downVotesBy.filter((userId) => userId !== profile.id)
        : prev.downVotesBy;

      return {
        ...prev,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };
    });
  };

  return (
    <ThreadItem
      users={dummyUsers}
      profile={profile}
      thread={thread}
      upVote={upVote}
      downVote={downVote}
      neutralizeVoteThread={neutralizeVote}
      onCommentClick={() => {}}
      onTitleClick={() => {}}
    />
  );
};

export { WithUnauthorizedUser, WithAuthorizedUser };
