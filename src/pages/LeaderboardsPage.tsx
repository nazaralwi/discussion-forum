import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { fetchLeaderboards } from "../states/leaderboards/leaderboardsSlice";

function LeaderboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaderboards, status } = useSelector((state: RootState) => state.leaderboards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaderboards());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load leaderboards</p>;

  return (
    <main className="flex flex-1 p-4 justify-center items-center">
      <div className="flex flex-col gap-4">
        {(leaderboards?.length ?? 0 > 0) ? (
          leaderboards?.map((leaderboard) => (
            <div
              key={leaderboard.user.name}
              className="flex justify-between gap-2"
            >
              <img src={leaderboard.user.avatar} alt="Profile image" className="rounded-full" />
              <h3>{leaderboard.user.email}</h3>
              <h3>{leaderboard.score}</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default LeaderboardPage;
