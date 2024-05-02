import SecureLS from "secure-ls";
import config from "./config";

const set = (key, value) => {
  if (config.ISSERVER) return;
  const ls = new SecureLS({ encodingType: "aes" });
  ls.set(key, value);
};

const get = (key) => {
  if (config.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: "aes" });
  return ls.get(key);
};

const remove = (key) => {
  if (config.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: "aes" });
  return ls.remove(key);
};

const removeToken = () => {
  if (config.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: "aes" });
  return ls.remove(`${config.REACT_APP_ACCESS_TOKEN}`);
};

const setToken = (value) => {
  if (config.ISSERVER) return;
  const ls = new SecureLS({ encodingType: "aes" });
  ls.set(`${config.REACT_APP_ACCESS_TOKEN}`, value);
};

const getToken = () => {
  if (config.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: "aes" });
  try {
    return ls.get(`${config.REACT_APP_ACCESS_TOKEN}`) || null;
  } catch (error) {
    return null;
  }
};

const Secure = {
  set,
  setToken,
  get,
  getToken,
  remove,
  removeToken,
};

export default Secure;
