import {
  type LinkedAccountWithMetadata,
  type PrivyErrorCode,
  type User,
  useLogin,
  useLogout,
  usePrivy,
} from '@privy-io/react-auth';
import { useState } from 'react';

interface LoginSuccessParams {
  user: User;
  isNewUser: boolean;
  wasAlreadyAuthenticated: boolean;
  loginMethod: string | null;
  loginAccount: LinkedAccountWithMetadata | null;
}

interface UseAuthProps {
  onLoginSuccess?: (params: LoginSuccessParams) => void;
  onLoginError?: (error: PrivyErrorCode) => void;
  onLogoutSuccess?: () => void;
}

const useAuth = ({
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
}: UseAuthProps = {}) => {
  const privy = usePrivy();
  const [isPrivyLoggingIn, setIsPrivyLoggingIn] = useState(false);

  const { login } = useLogin({
    onComplete: (params) => {
      setIsPrivyLoggingIn(false);
      onLoginSuccess?.(params);
    },
    onError: (error) => {
      setIsPrivyLoggingIn(false);
      onLoginError?.(error);
      console.error('Login failed:', error);
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
      onLogoutSuccess?.();
    },
  });

  const doLogin = async () => {
    setIsPrivyLoggingIn(true);
    login();
  };

  const doLogout = async () => {
    logout();
  };

  return {
    isLoggingIn: !privy.ready || isPrivyLoggingIn,
    isLoggedIn: privy.ready && privy.authenticated,
    logout: doLogout,
    login: doLogin,
  };
};

export default useAuth;
