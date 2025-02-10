import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import api from "./utils/api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./states";
import { fetchProfile } from "./states/profile/profileSlice";

function App() {
  const [token, setToken] = useState<string | null>(api.getAccessToken());
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(!!token);
    if (token) {
      dispatch(fetchProfile());
    }
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

  return (
    <>
      <Header isAuth={isAuth} logoutSuccess={onLogoutSuccess} />
      <Main
        isAuth={isAuth}
        loginSuccess={onLoginSuccess}
        registerSuccess={onRegisterSuccess}
      />
      <Footer />
    </>
  );
}

export default App;
