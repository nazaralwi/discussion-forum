import { Link } from 'react-router-dom';

interface HeaderParams {
  isAuth: boolean;
  logoutSuccess: () => void;
}

function Header({ isAuth, logoutSuccess }: HeaderParams) {
  if (!isAuth) {
    return (
      <header className="flex justify-between p-4">
        <h1 className="text-2xl font-semibold">
          <Link to="/">Our Forum</Link>
        </h1>
        <nav className="flex gap-2 justify-center items-center">
          <Link to="/leaderboards">Leaderboards</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="flex justify-between p-4">
      <h1 className="text-2xl font-semibold">
        <Link to="/">Our Forum</Link>
      </h1>
      <nav className="flex gap-2 justify-center items-center">
        <Link to="/leaderboards">Leaderboards</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logoutSuccess}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
