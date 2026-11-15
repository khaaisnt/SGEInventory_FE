import { getTokenFromCookie, removeAllFromCookie } from "@/helpers/cookies";
import axios from "axios";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Request Interceptor → Tambah Authorization otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor → Tangani error 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 =
      error.response &&
      (error.response.status === 401 || error.response.status === 403);
    const isLoginEndpoint = error.config.url.includes("/login") ?? false;
    if (is401 && !isLoginEndpoint) {
      removeAllFromCookie();
      redirect("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
