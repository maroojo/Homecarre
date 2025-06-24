"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import useNotification from "@/hooks/useNotification";
import { useFromOrigin } from "@/context/FromOriginContext";
import { columns } from "./paymentComponent/paymentColumn";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { hcPayment } from "@homecarre-api";

const CoConfirm = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoConfirm),
  { ssr: false }
);

const PaymentListPage = () => {
  const router = useRouter();
  const { getPayment, getPaymentStatus, updatePaymentStatus } = hcPayment();
  const date = dayjs();
  const month = date.format("MMM");
  const { setFromOrigin } = useFromOrigin();
  const { success, error } = useNotification();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const loadInitialData = async (searchParams, page = 1) => {
    setLoading(true);
    console.log("click", page);
    try {
      const keyword = searchParams?.keyword || "";
      const dateRange = searchParams?.date || [];
      console.log("sand", page);

      const paymentProm = getPayment({
        keyword: keyword,
        dateRange: dateRange,
        page: page,
        pagesize: pageSize,
      });

      const statusSync = getPaymentStatus();

      const [paymentRes, statusRes] = await Promise.all([
        paymentProm,
        statusSync,
      ]);

      if (paymentRes && statusRes) {
        console.log("paymentRes", paymentRes);
        setData(paymentRes.data);
        setTotal(paymentRes.total || 0);
        setPaymentStatus(statusRes);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchKey(params);
    setCurrentPage(1);
    loadInitialData(params, 1);
  };

  const handleRow = (record) => {
    setFromOrigin("pay");
    router.push(`/${record}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadInitialData(searchKey, page);
  };

  const handleStatusChange = async (paymentId, status) => {
    setLoading(true);
    try {
      const response = await updatePaymentStatus(paymentId, status);
      if (response.isSuccess) {
        loadInitialData(searchKey, currentPage);
        success({
          message: `Payment status updated to ${status}`,
          onClose: () => {},
        });
      } else {
        console.error("Failed to update status:", response.message);
        error({
          message: `Failed to update status: ${response.message}`,
          onClose: () => {},
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmStatusChange = async () => {
    setOpenModal(false);
    if (!selectedPayment) return;
    try {
      const response = await updatePaymentStatus(
        selectedPayment,
        selectedStatus
      );
      if (response.isSuccess) {
        loadInitialData(searchKey, currentPage);
      } else {
        console.error("Failed to update status:", response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const message = (
    <div className="mx-4 my-2">
      <h1 className="mb-6">Are you sure you want to change?</h1>
      <p>{" -> " + selectedStatus}</p>
    </div>
  );

  useEffect(() => {
    loadInitialData(searchKey, currentPage);
  }, []);

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={total ?? "N/A"}
        pagination={
          <CtPagination
            default={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            className="mt-4 text-center"
          />
        }
        modal={[
          <CoConfirm
            key="payment-confirm-modal"
            visible={openModal}
            onClose={() => setOpenModal(false)}
            closable={true}
            onConfirm={handleConfirmStatusChange}
            confirmText="yes"
            cancelText="Cancel"
            title="Confirm"
            message={message}
            width={400}
            maskClosable={true}
          />,
        ]}
      >
        <CtTable
          columns={columns(paymentStatus, handleStatusChange, handleRow)}
          loading={loading}
          data={data}
          rowKey={(record) => record.payment_no}
        />
      </ClTable>
    </div>
  );
};

export default PaymentListPage;
