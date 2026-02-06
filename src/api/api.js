import axios from "axios";
import config from "../config";
import { auth } from "@/firebase.config";

const API = axios.create({
  baseURL: config.DEFAULT_API,
});

API.interceptors.request.use(
  async (request) => {
    if (typeof window !== "undefined") {
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        request.headers.Authorization = `Bearer ${token}`;
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);

export default API;
