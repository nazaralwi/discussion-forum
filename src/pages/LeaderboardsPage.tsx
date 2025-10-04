import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states';
import { fetchLeaderboards } from '../states/leaderboards/leaderboardsSlice';

function LeaderboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const leaderboardsState = useSelector(
    (state: RootState) => state.leaderboards
  );

  useEffect(() => {
    if (leaderboardsState.status === 'idle') {
      dispatch(fetchLeaderboards());
    }
  }, [dispatch, leaderboardsState.status]);

  return (
    <main className="w-full lg:w-1/2 lg:mx-auto flex-1 p-4 justify-center items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Leaderboards
      </h1>
      <div className="flex flex-col gap-4">
        {leaderboardsState.status === 'loading'
          ? <p>Loading...</p>
          : leaderboardsState.leaderboards?.map((leaderboard) => (
            <div
              key={leaderboard.user.name}
              className="flex justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={leaderboard.user.avatar}
                  alt="Profile image"
                  className="rounded-full"
                />
                <h3>{leaderboard.user.email}</h3>
              </div>
              <h3>{leaderboard.score}</h3>
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default LeaderboardPage;
