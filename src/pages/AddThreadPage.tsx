import { useDispatch, useSelector } from 'react-redux';
import ThreadForm from '../components/ThreadForm';
import { AppDispatch, RootState } from '../states';
import { createThread } from '../states/threads/threadsSlice';
import { useNavigate } from 'react-router';


function AddThreadPage() {
  const dispatch = useDispatch<AppDispatch>();
  const threadState = useSelector((state: RootState) => state.threads);
  const navigate = useNavigate();

  const handleCreateThread = async (title: string, body: string, category: string | undefined) => {
    dispatch(createThread({ title: title, body: body, category: category }));
    navigate('/');
  };

  const categories = Array.from(new Set(threadState.threads?.map((thread) => thread.category)));

  return (
    <>
      <main className="w-full lg:w-1/2 lg:mx-auto flex flex-1 p-4 flex-col items-center justify-center">
        <ThreadForm createThread={handleCreateThread} categories={categories} className="mb-4" />
      </main>
    </>
  );
}

export default AddThreadPage;