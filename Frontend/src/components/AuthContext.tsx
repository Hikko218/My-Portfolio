/*
  AuthContext provides authentication state and setter for the entire app.
  Use AuthProvider to wrap your app and useAuth to access login state in components.
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  checkAuth: () => Promise<boolean>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  checkAuth: async () => false,
  refreshAuth: async () => {},
});

// Create a context for authentication state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth-Check Funktion, gibt nur true/false zurück, stabil via useCallback
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/admin`, {
        method: "GET",
        credentials: "include",
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  }, []);

  // Setzt den State nach aktuellem Auth-Status, stabil via useCallback
  const refreshAuth = useCallback(async () => {
    const ok = await checkAuth();
    setIsLoggedIn(ok);
  }, [checkAuth]);

  // Nur einmal beim Laden prüfen
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, checkAuth, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// AuthProvider wraps the app and provides login state to all children
export const useAuth = () => useContext(AuthContext);
// useAuth hook to access authentication state and setter in components
