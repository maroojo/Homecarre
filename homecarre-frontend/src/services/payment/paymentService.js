import api from "@/util/api";
import { handleApiResponse } from "@/util/handleApiResponse";
import dayjs from "dayjs";

const PaymentService = () => {
  const getPayment = async ({
    keyword,
    dateRange,
    page = 1,
    pagesize = 10,
    hc_no = null,
    status = null,
    sortBy = "payment_no",
    sortOrder = "DESC",
  }) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;

    const endpoint = (() => {
      let url = `/admin/payments?page=${page}&pagesize=${pagesize}`;
      if (keyword) url += `&q=${keyword}`;
      if (startDate) url += `&from=${startDate}`;
      if (endDate) url += `&to=${endDate}`;
      if (hc_no) url += `&hc_no=${hc_no}`;
      return url;
    })();

    const response = await handleApiResponse(api(endpoint, "GET"));

    return response.data;
  };

  const getPaymentStatus = async () => {
    const response = await handleApiResponse(
      api("/admin/payment-statuses", "GET")
    );
    return response.data;
  };

  const getPaymentType = async () => {
    const response = await handleApiResponse(
      api(`/admin/payment-types`, "GET")
    );
    return response;
  };

  const updatePaymentStatus = async (id, status) => {
    const response = await handleApiResponse(
      api("/admin/payment/payment-update", "POST", {
        payment_no: id,
        action: status,
      }),
      true
    );
    return response;
  };

  const createOnePayment = async (data) => {
    const response = await handleApiResponse(
      api(`/admin/payment/create-one-time`, "POST", data)
    );
    return response;
  };

  const uploadPaymentFile = async (data) => {
    const response = await handleApiResponse(
      api("/admin/payment/upload", "POST", {
        payment_no: data.payment_no,
        image: data.image,
      }),
      true
    );
    return response;
  };

  return {
    getPayment,
    getPaymentStatus,
    getPaymentType,
    updatePaymentStatus,
    createOnePayment,
    uploadPaymentFile,
  };
};
export default PaymentService;
