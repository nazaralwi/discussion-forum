import { useSelector } from "react-redux";
import { RootState } from "../states";

function ProfilePage() {
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <>
      <main className="w-1/2 mx-auto flex-1 p-4 justify-center items-center">
        <div className="flex flex-col gap-2">
          <h3>{profile?.name}</h3>
          <p>{profile?.email}</p>
          <img src={profile?.avatar} alt="Profile picture" />
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
