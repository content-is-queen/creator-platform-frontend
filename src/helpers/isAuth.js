import Secure from "@/utils/SecureLs";
import { jwtDecode } from "jwt-decode";

const isAuth = (token = Secure.getToken()) => {
  const istoken = Secure.getToken();
  if (!istoken) return false;
  try {
    const jwt = jwtDecode(token);
    const now = new Date();
    if (now.getTime() > jwt.exp * 1000) {
      Secure.removeToken();
      return false;
    }
    return jwtDecode(token);
  } catch (error) {
    return false;
  }
};

export default isAuth;
