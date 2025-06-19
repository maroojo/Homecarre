import { notification } from "antd";

export const handleApiResponse = async (apiCall, notify = false) => {
  try {
    const response = await apiCall;
    if (notify) {
      notification.success({
        message: "Success",
        description: response?.message || "Operation successful",
      });
    }
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    if (notify) {
      notification.error({
        message: "Error",
        description: message,
      });
    }

    if (
      error?.response?.status === 401 ||
      message === "Session expired"
    ) {
      window.dispatchEvent(new CustomEvent("session-expired"));
    }

    return {
      isSuccess: false,
      data: null,
      message,
    };
  }
};
