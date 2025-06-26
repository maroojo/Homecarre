import dayjs from "dayjs";
import { handleApiResponse, cleanFormUndefined } from "@/util";
import api from "@/util/api";

const RequestManagerService = () => {
  const createRequest = async (data) => {
    const response = await handleApiResponse(
      api(`/admin/request`, "POST", data),
      true
    );
    return response;
  };

  const updateRequest = async (data) => {
    const response = await handleApiResponse(
      api(`/admin/request/update/${data.hc_no}`, "POST", data),
      true
    );
    return response;
  };

  return {
    createRequest,
    updateRequest,
  };
};
export default RequestManagerService;
