import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

export default axiosInstance;
