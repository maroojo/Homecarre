import dayjs from "dayjs";
import { handleApiResponse } from "@/util";
import api from "@/util/api";


const ContractManagerService = () => {
  const createContract = async (data) => {
    const response = await handleApiResponse(
      api(`/admin/contract/create`, "POST", data),
      true
    );
    return response;
  };

  const updateContract = async (data) => {
    const response = await handleApiResponse(
      api(`/admin/contract/update/${data.hc_no}`, "POST", data),
      true
    );
    return response;
  };
  return { createContract, updateContract };
};

export default ContractManagerService;
