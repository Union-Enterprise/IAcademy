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
  setAuth: (isAuthenticated: boolean, userData: User) => void;
}

const UserContext = createContext<UserContextType>({
  user: {
    nickname: "",
    name: "",
    email: "",
    password: "",
    isPremium: false,
    since: "00/00/000",
    img: "",
  },
  isAuthenticated: false,
  loading: true,
  setAuth: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "Visitante",
    nickname: "visitante-0421032312",
    email: "email@email.com",
    password: "123456",
    isPremium: false,
    since: "00/00/0000",
    img: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5002/profile", {
          withCredentials: true,
        });

        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        console.log("Erro ao buscar usuário:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const setAuth = (isAuthenticated: boolean, userData: User) => {
    setIsAuthenticated(isAuthenticated);
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loading, setAuth }}>
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
