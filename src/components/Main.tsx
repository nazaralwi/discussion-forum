import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ThreadDetailPage from "../pages/ThreadDetailPage";
import LeaderboardPage from "../pages/LeaderboardsPage";
import UserListPage from "../pages/UserListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NoFoundPage from "../pages/NoFoundPage";
import ProfilePage from "../pages/ProfilePage";

interface MainProps {
  isAuth: boolean;
  loginSuccess: (token: string) => void;
  registerSuccess: () => void;
}

function Main({ isAuth, loginSuccess, registerSuccess }: MainProps) {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<HomePage isAuth={isAuth} />} />
        <Route path="/threads/:id" element={<ThreadDetailPage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route
          path="/login"
          element={<LoginPage loginSuccess={loginSuccess} />}
        />
        <Route
          path="/register"
          element={<RegisterPage registerSuccess={registerSuccess} />}
        />
        <Route path="/*" element={<NoFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage isAuth={isAuth} />} />
      <Route path="/threads/:id" element={<ThreadDetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/*" element={<NoFoundPage />} />
    </Routes>
  );
}

export default Main;
