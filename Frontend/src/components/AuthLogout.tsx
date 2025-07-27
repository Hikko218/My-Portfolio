
// Import authentication context and Next.js router
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";


// API base URL from environment
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


/**
 * useLogout
 * Custom hook to log out the user via API call and update global login state.
 * Calls /auth/logout endpoint, resets login state, and redirects to home.
 */
export function useLogout() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  return async () => {
    // Make logout request to backend
    const res = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setIsLoggedIn(false); // Update global state
      router.push("/"); // Redirect to home page
    }
  };
}
