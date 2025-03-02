import { useSelector } from "react-redux";
import { RootState } from "../states";

function UserListPage() {
  const { userList } = useSelector((state: RootState) => state.userList);

  return (
    <main className="w-full lg:w-1/2 lg:mx-auto flex-1 p-4 justify-center items-center">
      <div className="leaderboards-container">
        {(userList?.length ?? 0 > 0) ? (
          userList?.map((user) => (
            <div key={user.id}>
              <h3>{user.email}</h3>
              <h3>{user.avatar}</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default UserListPage;
