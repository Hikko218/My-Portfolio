import { useAuth } from "./AuthContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function useAuthCheck() {
  const { setIsLoggedIn } = useAuth();
  return async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/admin`, {
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(true);
        return true;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoggedIn(false);
      return false;
    }
  };
}
