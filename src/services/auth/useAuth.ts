interface LoginSuccessParams {
  user: Record<string, any> | null;
  isNewUser: boolean;
  wasAlreadyAuthenticated: boolean;
  loginMethod: string | null;
  loginAccount: Record<string, any> | null;
}

interface UseAuthProps {
  onLoginSuccess?: (params: LoginSuccessParams) => void;
  onLoginError?: (error: unknown) => void;
  onLogoutSuccess?: () => void;
}

const useAuth = ({
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
}: UseAuthProps = {}) => {
  const doLogin = async () => {
    console.log('Logging in...');
    try {
      await Promise.resolve(true);
    } catch (e) {
      onLoginError?.(e);
    }
    onLoginSuccess?.({
      user: { name: 'John Doe' },
      isNewUser: false,
      wasAlreadyAuthenticated: false,
      loginMethod: 'password',
      loginAccount: { email: 'john.doe@example.com' },
    });
  };

  const doLogout = async () => {
    console.log('Logging out...');
    await Promise.resolve(true);
    onLogoutSuccess?.();
  };

  return {
    isLoggingIn: false,
    isLoggedIn: false,
    logout: doLogout,
    login: doLogin,
  };
};

export default useAuth;
