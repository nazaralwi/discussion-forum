import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import api from './utils/api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './states';
import { fetchProfile } from './states/profile/profileSlice';
import { fetchUserList } from './states/userlist/userListSlice';
import LoadingBar from 'react-redux-loading-bar';
import { fetchThreads } from './states/threads/threadsSlice';

function App() {
  const [token, setToken] = useState<string | null>(api.getAccessToken());
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const profileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(!!token);
    if (token) {
      dispatch(fetchProfile());
    }
    dispatch(fetchThreads());
    dispatch(fetchUserList());
  }, [dispatch, token]);

  const onLoginSuccess = (token: string) => {
    api.putAccessToken(token);
    setToken(token);
    navigate('/');
  };

  const onLogoutSuccess = () => {
    api.deleteAccessToken();
    setToken(null);
    navigate('/');
  };

  const onRegisterSuccess = () => {
    navigate('login');
  };

  return (
    <>
      <LoadingBar className='h-1 bg-violet-500' />
      <Header isAuth={isAuth} logoutSuccess={onLogoutSuccess} />
      <Main
        isAuth={isAuth}
        profile={profileState.profile!}
        loginSuccess={onLoginSuccess}
        registerSuccess={onRegisterSuccess}
      />
      <Footer />
    </>
  );
}

export default App;
