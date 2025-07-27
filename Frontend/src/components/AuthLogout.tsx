import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function useLogout() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  return async () => {
    const res = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setIsLoggedIn(false);
      router.push("/")
    }
  };
}
