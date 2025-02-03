import { useEffect, useState } from "react";
import { Leaderboard } from "../utils/models";
import api from "../utils/api";

function LeaderboardPage() {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);

  useEffect(() => {
    async function fetchLeaderboars() {
      try {
        const leaderboards: Leaderboard[] = await api.getAllLeaderboards();
        setLeaderboards(leaderboards);
      } catch (error) {
        console.log("Error " + (error as Error).message);
      }
    }

    fetchLeaderboars();
  });

  return (
    <main className="flex flex-1 p-4 justify-center items-center">
      <div className='flex flex-col gap-4'>
        {
          leaderboards.length > 0 ? (
            leaderboards.map((leaderboard) => (
              <div key={leaderboard.user.name} className="flex justify-between gap-2">
                <h3>{leaderboard.user.email}</h3>
                <h3>{leaderboard.score}</h3>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    </main>
  )
}

export default LeaderboardPage;