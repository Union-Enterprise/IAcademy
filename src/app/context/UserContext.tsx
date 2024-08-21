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
  email?: string;
  name: string;
  nickname?: string;
  img?: string;
}

interface UserContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: { name: "Visitante" },
  isAuthenticated: false,
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: "Visitante" });
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
