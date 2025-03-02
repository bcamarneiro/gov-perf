import GovPerfLogo from '@/components/ui/Icons/GovPerfLogo';
import useAuth from '@services/auth/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

// TODO: Needs implementation

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, isLoggingIn, logout } = useAuth({
    onLoginSuccess: ({ wasAlreadyAuthenticated }) => {
      if (wasAlreadyAuthenticated) return;
      navigate('/initiatives');
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <GovPerfLogo className="h-52 w-52" />
        <h1>Gov Perf</h1>
      </div>

      {!isLoggingIn && (
        <nav className="w-full flex flex-row gap-5 items-center justify-center bg-neutral-1 p-4">
          {!isLoggedIn && (
            <button className="cursor-pointer" type="button" onClick={login}>
              Login
            </button>
          )}
          {isLoggedIn && <Link to="/initiatives">Initiatives</Link>}
          {isLoggedIn && (
            <Link onClick={logout} to="#">
              Logout
            </Link>
          )}
        </nav>
      )}
    </>
  );
};

export default LandingPage;
