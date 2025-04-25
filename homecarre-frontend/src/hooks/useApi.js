import axiosInstance from "@/lib/config/axios.config";
import { AxiosError } from "axios";

const useApi = () => {
  const axios = axiosInstance;

  const api = async (url, method = "GET", body = null, headers = null) => {
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers: headers,
      });
      return response.data;
    } catch (err) {
      if (
        err?.response?.status === 401 ||
        err?.response?.data?.message === "Session expired"
      ) {
        window.dispatchEvent(new CustomEvent("session-expired"));
      }
      throw err;
    }
  };

  return { api };
};

export default useApi;
