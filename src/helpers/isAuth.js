import { jwtDecode } from 'jwt-decode';
import Secure from '../utils/SecureLs';

const isAuth = (token = Secure.getToken()) => {
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
