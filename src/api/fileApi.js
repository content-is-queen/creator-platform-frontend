import axios from "axios";
import Keys from "../utils/keys";
import Secure from "../utils/SecureLs";

const FILEAPI = axios.create({
  baseURL: `${Keys.DEFAULT_API}/api/v1`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${Secure.getToken()}`,
  },
});
export default FILEAPI;
