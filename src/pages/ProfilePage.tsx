import { useSelector } from 'react-redux';
import { RootState } from '../states';

function ProfilePage() {
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex-1 p-4 justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <img
            src={profile?.avatar}
            alt="Profile picture"
            className="rounded-full"
          />
          <h3>{profile?.name}</h3>
          <p>{profile?.email}</p>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
