import axios from "axios";
import config from "../utils/config";

const API = axios.create({
  baseURL: `${config.DEFAULT_API}`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "max-age=1800",
  },
});

export const fetcher = async (url) => {
  return API.get(url).then((res) => {
    if (!res.data) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export default API;
