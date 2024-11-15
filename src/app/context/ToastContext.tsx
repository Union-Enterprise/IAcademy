"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastMessage {
  message: string;
  type: "success" | "error";
}

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: "success" | "error") => {
    setToasts((prevToasts) => [...prevToasts, { message, type }]);

    setTimeout(() => {
      removeToast(message);
    }, 3000);
  };

  const removeToast = (message: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.message !== message)
    );
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      <div className="fixed bottom-5 left-5 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <motion.div
              key={index}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`p-3 rounded shadow-md text-white ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
};
