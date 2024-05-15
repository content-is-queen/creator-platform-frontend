import axios from "axios";
import config from "../config";
import Secure from "../utils/SecureLs";

const FILEAPI = axios.create({
  baseURL: `${config.DEFAULT_API}/`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${Secure.getToken()}`,
  },
});
export default FILEAPI;
