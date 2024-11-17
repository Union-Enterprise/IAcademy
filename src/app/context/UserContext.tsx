"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import axios from "axios";

interface User {
  id?: any;
  email: string;
  name: string;
  nickname?: string;
  img?: string;
  phone?: string;
  birth?: string;
  cpf?: string;
  is_premium: boolean;
  streak?: number;
  latestStreak?: string;
  is_adm: boolean;
  createdAt: string;
  googleId?: string;
}

interface UserContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (isAuthenticated: boolean, userData: User) => void;
}

const defaultUser: User = {
  email: "email@example.com",
  name: "Visitante",
  nickname: "visitante",
  is_premium: false,
  is_adm: false,
  createdAt: "00/00/0000",
  img: "",
};

const defaultContext: UserContextType = {
  user: defaultUser,
  isAuthenticated: false,
  loading: true,
  setAuth: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return date.toLocaleDateString("pt-BR", options);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5002/profile", {
          withCredentials: true,
        });

        setIsAuthenticated(true);

        const formattedUser = {
          ...response.data,
          createdAt: formatDate(response.data.createdAt),
        };

        setUser(formattedUser);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const setAuth = (isAuthenticated: boolean, userData: User) => {
    setIsAuthenticated(isAuthenticated);
    const formattedUser = {
      ...userData,
      createdAt: formatDate(userData.createdAt),
    };
    setUser(formattedUser);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      setAuth,
    }),
    [user, isAuthenticated, loading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser precisa ser utilizado com um UserProvider");
  }

  return context;
};
