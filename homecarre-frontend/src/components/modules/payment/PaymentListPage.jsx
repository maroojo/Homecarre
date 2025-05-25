"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

import { Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { columns } from "./paymentComponent/paymentColumn";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";

import { hcPayment } from "@homecarre-api";

const CoConfirm = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoConfirm),
  { ssr: false }
);

const PaymentListPage = () => {
  const { getPayment, getPaymentStatus, updatePaymentStatus } = hcPayment();
  const date = dayjs();
  const month = date.format("MMM");
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const loadInitialData = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      const keyword = searchParams?.keyword || "";
      const dateRange = searchParams?.date || [];
      const searchKey = keyword || dateRange.length > 0;

      const paymentProm = searchKey
        ? getPayment(keyword, dateRange, page, pageSize)
        : getPayment(page, pageSize);

      const statusSync = getPaymentStatus();

      const [paymentRes, statusRes] = await Promise.all([
        paymentProm,
        statusSync,
      ]);

      if (paymentRes && statusRes) {
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
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    callGetContract(searchKey, page);
  };

  const handleStatusChange = async (paymentId, status) => {
    console.log("status change", paymentId, status);
    console.log("status",data.status)
    setSelectedStatus(status);
  };

  const handleConfirmStatusChange = async () => {
    setOpenModal(false);
    console.log("save status change", selectedStatus);
    try {
      const response = await updatePaymentStatus(
        data.payment_no,
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
    loadInitialData(searchKey);
  }, [searchKey]);

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        rightButton={
          <Button variant="solid">
            <PlusOutlined /> {month}
          </Button>
        }
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
          columns={columns(paymentStatus, handleStatusChange, setOpenModal)}
          loading={loading}
          data={data}
          rowKey={(record) => record.payment_no}
        />
      </ClTable>
    </div>
  );
};

export default PaymentListPage;
