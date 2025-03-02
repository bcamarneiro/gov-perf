'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useAppSettingsStore } from '@store/useAppSettingsStore';

// TODO: Needs implementation

const { VITE_PRIVY_APP_ID, VITE_PRIVY_CLIENT_ID } = import.meta.env;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useAppSettingsStore();

  return (
    <PrivyProvider
      appId={VITE_PRIVY_APP_ID}
      clientId={VITE_PRIVY_CLIENT_ID}
      config={{
        appearance: {
          theme: theme,
          accentColor: '#676FFF',
          logo: '/gov-perf-logo.svg',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default AuthProvider;
