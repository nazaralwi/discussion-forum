import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import api from "./utils/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./states";
import { fetchProfile } from "./states/profile/profileSlice";
import LoadIndicator from "./components/LoadIndicator";
import ErrorMessage from "./components/ErrorMessage";
import { fetchUserList } from "./states/userlist/userListSlice";

function App() {
  const [token, setToken] = useState<string | null>(api.getAccessToken());
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const profileState = useSelector((state: RootState) => state.profile);
  const userListState = useSelector((state: RootState) => state.userList);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(!!token);
    if (token) {
      dispatch(fetchProfile());
    }
    dispatch(fetchUserList());
  }, [dispatch, token]);

  const onLoginSuccess = (token: string) => {
    api.putAccessToken(token);
    setToken(token);
    navigate("/");
  };

  const onLogoutSuccess = () => {
    api.deleteAccessToken();
    setToken(null);
    navigate("/");
  };

  const onRegisterSuccess = () => {
    navigate("login");
  };

  if (profileState.status === "loading" && userListState.status === "loading")
    return <LoadIndicator />;
  if (profileState.status === "failed" && userListState.status === "failed")
    return <ErrorMessage message="Failed to load data" />;

  return (
    <>
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
