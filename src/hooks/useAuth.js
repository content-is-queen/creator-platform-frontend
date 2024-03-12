import isAuth from "@/helpers/isAuth";

const useAuth = () => {
  const user = isAuth();

  const startAuth = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    Secure.removeToken();
    window.location.href = "/";
  };

  return { user, startAuth, handleLogout };
};

export default useAuth;
