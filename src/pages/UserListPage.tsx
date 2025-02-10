import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { fetchUserList } from "../states/userlist/userlistSlice";

function UserListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { userList, status } = useSelector(
    (state: RootState) => state.userList,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserList());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load user list</p>;

  return (
    <main className="flex flex-1 p-4 justify-center items-center">
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
