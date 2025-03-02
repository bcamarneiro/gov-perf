import LoadingScreen from '@components/LoadingScreen/LoadingScreen';
import useAuth from '@services/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/',
}) => {
  const { isLoggedIn, isLoggingIn } = useAuth();

  if (isLoggingIn) {
    return <LoadingScreen />;
  }

  if (!isLoggingIn && !isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
