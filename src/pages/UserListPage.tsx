import { useEffect, useState } from "react";
import { User } from "../utils/models";
import api from "../utils/api";

function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users: User[] = await api.getAllUsers();
        setUsers(users);
      } catch (error) {
        console.log("Error: " + (error as Error).message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="flex flex-1 p-4 justify-center items-center">
      <div className='leaderboards-container'>
        {
          users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                <h3>{user.email}</h3>
                <h3>{user.avatar}</h3>
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

export default UserListPage;