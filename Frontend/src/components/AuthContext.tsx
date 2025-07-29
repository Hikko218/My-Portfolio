/*
  AuthContext provides authentication state and setter for the entire app.
  Use AuthProvider to wrap your app and useAuth to access login state in components.
*/
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext({
  isLoggedIn: false, // Indicates if the user is logged in
  setIsLoggedIn: (status: boolean) => {}, // Function to update login state
});

// Create a context for authentication state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks on load if a valid token exists (validated by backend)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Adjust the URL to match your backend endpoint if needed
        const res = await fetch(`${apiUrl}/auth/admin`, {
          method: "GET",
          credentials: "include", // sends cookies with the request
        });
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// AuthProvider wraps the app and provides login state to all children
export const useAuth = () => useContext(AuthContext);
// useAuth hook to access authentication state and setter in components
