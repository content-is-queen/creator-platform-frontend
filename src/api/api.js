import axios from "axios";
import Keys from "../utils/keys";
import Secure from "../utils/SecureLs";

const API = axios.create({
  baseURL: `${Keys.DEFAULT_API}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Secure.getToken()}`,
    "Cache-Control": "max-age=1800",
  },
});
export default API;
