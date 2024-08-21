"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  email: string;
  name: string;
  nickname?: string;
  password: string;
  img?: string;
  phone?: string;
  birth?: string;
  cpf?: string;
  isPremium: false;
  since: string;
}

interface UserContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: {
    nickname: "",
    name: "",
    email: "",
    password: "",
    isPremium: false,
    since: "00/00/000",
  },
  isAuthenticated: false,
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    nickname: "Visitante",
    name: "visitante-0421032312",
    email: "email@email.com",
    password: "123456",
    isPremium: false,
    since: "00/00/0000",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel("Requisição cancelada devido ao timeout.");
        }, 5000);

        const response = await axios.get("http://localhost:5002/profile", {
          withCredentials: true,
          cancelToken: source.token,
        });

        clearTimeout(timeout);
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Requisição cancelada:", error.message);
        } else {
          console.log("Erro ao buscar usuário:", error);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser precisa ser utilizado com um UserProvider");
  }

  return context;
};
