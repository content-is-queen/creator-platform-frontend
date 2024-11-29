import axios from "axios";
import config from "../config";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: `${config.DEFAULT_API}`,
});

// Add request interceptor to add token to all requests
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't tried refreshing yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      try {
        // Get new token from Firebase
        const auth = getAuth();
        const newToken = await auth.currentUser.getIdToken(true);

        // Update token in localStorage
        localStorage.setItem("token", JSON.stringify(newToken));

        // Update the Authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request with new token
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear auth state and redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
