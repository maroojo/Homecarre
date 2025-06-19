import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL:"http://localhost:8000/api",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_token_if_any",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    Referer: "https://accomasia.co.th",
    Origin: "https://accomasia.co.th",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default axiosInstance;
