/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);