"use client";

import { createContext, useContext, ReactNode, useState } from "react";

// Defina o tipo do contexto
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Crie o contexto com valor padrão vazio
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Crie o provedor do contexto
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook para usar o contexto
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
