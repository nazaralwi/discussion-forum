import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { fetchProfile } from "../states/profile/profileSlice";

function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load profile</p>;

  return (
    <>
      <main className="flex flex-1 p-4 justify-center">
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
