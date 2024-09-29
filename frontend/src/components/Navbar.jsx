import { Link } from "react-router-dom";
import { useAuthStore } from '../store/auth';

export const Navbar = () => {

    const [isLoggedIn, user] = useAuthStore((state) => [
      state.isLoggedIn,
      state.user,
    ]);

    return (
      <nav>
        {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
      </nav>
   );
}

const LoggedInView = ({ user }) => {
  return (
      <div>
          <h1>Logged in: {user.username}</h1>
          <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/wallets">Wallets</Link>
            </li>
            <li>
                <Link to="/transactions">Transactions</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
          </ul>
      </div>
  );
};

export const LoggedOutView = ({ title = 'Home' }) => {
  return (
      <div>
        <h1>{title}</h1>
        <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
          {/* <li>
              <Link to="/wallets">Wallets</Link>
          </li>
          <li>
              <Link to="/transactions">Transactions</Link>
          </li> */}
          <li>
              <Link  to="/login">Login</Link>
          </li>
          <li>
              <Link  to="/register">Register</Link>
          </li>
        </ul>
      </div>
  );
};