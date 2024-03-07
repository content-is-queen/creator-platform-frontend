import SecureLS from 'secure-ls';
import Keys from './keys';

const set = (key, value) => {
  if (Keys.ISSERVER) return;
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(key, value);
};

const get = (key) => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.get(key);
};

const remove = (key) => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(key);
};

const removeToken = () => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(`${Keys.REACT_APP_ACCESS_TOKEN}`);
};

const setToken = (value) => {
  if (Keys.ISSERVER) return;
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(`${Keys.REACT_APP_ACCESS_TOKEN}`, value);
};

const getToken = () => {
  if (Keys.ISSERVER) return null;
  const ls = new SecureLS({ encodingType: 'aes' });
  try {
    return ls.get(`${Keys.REACT_APP_ACCESS_TOKEN}`) || null;
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
