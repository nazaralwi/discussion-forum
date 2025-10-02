import { useDispatch } from 'react-redux';
import ThreadForm from '../components/ThreadForm';
import { AppDispatch } from '../states';
import { createThread } from '../states/threads/threadsSlice';
import { useNavigate } from 'react-router';


function AddThreadPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreateThread = async (title: string, body: string) => {
    dispatch(createThread({ title: title, body: body }));
    navigate('/');
  };

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center justify-center">
        <ThreadForm createThread={handleCreateThread} className="mb-4" />
      </main>
    </>
  );
}

export default AddThreadPage;