import React from 'react';

// @ts-expect-error
export const AuthContext = React.createContext();
const Provider = AuthContext.Provider;

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: 'USER' | 'ADMIN';
}

interface AuthInfo {
  userData: UserData | null;
}

export function AuthProvider({ children }: Props) {
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    userData: null,
  });

  const isAuthenticated = authInfo.userData;

  const isAdmin = authInfo.userData?.role === 'ADMIN';

  return <Provider value={{ authInfo, isAuthenticated, setAuthInfo, isAdmin }}>{children}</Provider>;
}
