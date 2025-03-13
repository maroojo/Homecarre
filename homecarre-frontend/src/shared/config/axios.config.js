import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

export default api;
