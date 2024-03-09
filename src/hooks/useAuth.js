import isAuth from "@/helpers/isAuth";
import useRouter from "next/router";

const useAuth = () => {
  const user = isAuth();
  const router = useRouter();

  const startAuth = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    Secure.removeToken();
    router.push("/");
  };

  return { user, handleLogout };
};

export default useAuth;
