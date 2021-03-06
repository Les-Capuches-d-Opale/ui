import { FC, createContext, useContext, useMemo, useState } from "react";

export type UserSession = {
  token: string | undefined;
};

type AuthContextProps = {
  authUser?: UserSession;
  setAuthUser: (data: UserSession) => void;
  removeAuthUser: () => void;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<UserSession | undefined>(() => {
    const existingUser = localStorage.getItem("USER");
    if (existingUser) {
      return JSON.parse(existingUser);
    }
  });

  const setUser = (data: UserSession) => {
    localStorage.setItem("USER", JSON.stringify(data));
    setAuthUser(data);
  };

  const removeUser = () => {
    localStorage.removeItem("USER");
    setAuthUser(undefined);
  };

  const providerValue = useMemo(() => {
    return { authUser, setAuthUser: setUser, removeAuthUser: removeUser };
  }, [authUser, setAuthUser, removeUser]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
