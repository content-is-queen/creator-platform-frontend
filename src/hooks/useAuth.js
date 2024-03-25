import isAuth from "@/helpers/isAuth";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const user = isAuth();

  const startAuth = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    Secure.removeToken();
    window.location.href = "/";
  };

  return { user, startAuth, handleLogout };
};

export default useAuth;
