import axiosInstance from "@/lib/config/axiosConfig";

const api = async (url, method = "GET", body = null, headers = null) => {
  try {
    const response = await axiosInstance({
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

export default api;