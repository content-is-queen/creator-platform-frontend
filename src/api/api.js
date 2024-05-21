import axios from "axios";
import config from "../config";

const API = axios.create({
  baseURL: `${config.DEFAULT_API}`,
});

export default API;
