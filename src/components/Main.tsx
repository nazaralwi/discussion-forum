import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ThreadDetailPage from "../pages/ThreadDetailPage";
import LeaderboardPage from "../pages/LeaderboardsPage";
import UserListPage from "../pages/UserListPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/threads/:id" element={<ThreadDetailPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default Main;