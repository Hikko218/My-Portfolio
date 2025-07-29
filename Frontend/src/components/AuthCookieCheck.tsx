"use client";
// Import authentication context hook
import { useAuth } from "./AuthContext";

// API base URL from environment
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * useAuthCheck
 * Custom hook to check authentication status via cookie-based API call.
 * Calls /auth/admin endpoint and updates global login state.
 * Returns true if authenticated, false otherwise.
 */
export function useAuthCheck() {
  const { setIsLoggedIn } = useAuth();
  return async () => {
    try {
      // Make request to protected endpoint with credentials (cookies)
      const res = await fetch(`${apiUrl}/auth/admin`, {
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(true); // User is authenticated
        return true;
      } else {
        setIsLoggedIn(false); // User is not authenticated
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoggedIn(false); // Error, treat as not authenticated
      return false;
    }
  };
}
