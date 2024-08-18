"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  email?: string;
  name: string;
  nickname?: string;
  avatar?: string;
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
    axios
      .get("http://localhost:5002/profile", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  });

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
