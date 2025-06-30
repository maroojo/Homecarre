"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useParams } from "next/navigation";
import { hcPayment } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./PaymentColumn";
import useNotification from "@/hooks/useNotification";

const CoModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoModal),
  { ssr: false }
);
const CeFcPayment = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CeFcPayment),
  { ssr: false }
);

const Payment = () => {
  const { hcID } = useParams();
  const { getPayment, getPaymentStatus, updatePaymentStatus } = hcPayment();
  const { success, error } = useNotification();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [searchStatus, setSearchStatus] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const loadInitialData = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      const keyword = searchParams?.keyword || "";
      const dateRange = searchParams?.date || [];
      const searchKey = keyword || dateRange.length > 0;

      const paymentProm = searchKey
        ? getPayment({
            keyword,
            dateRange,
            page,
            pagesize: pageSize,
            hc_no: hcID,
          })
        : getPayment({
            page: page,
            pagesize: pageSize,
            hc_no: hcID,
          });

      const statusSync = getPaymentStatus();

      const [paymentRes, statusRes] = await Promise.all([
        paymentProm,
        statusSync,
      ]);

      if (paymentRes && statusRes) {
        setData(paymentRes.data);
        console.log("first", paymentRes);
        setTotal(paymentRes.total || 0);
        setPaymentStatus(statusRes);
        setSearchStatus(statusRes.map((item) => item.label));
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadInitialData({ ...searchKey }, page);
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (hcID) {
      loadInitialData(searchKey, currentPage);
    }
    console.log("first", hcID);
  }, []);
  return (
    <div>
      <div>
        <ClTable
          onSearch={
            <CtSearch onSearch={handleSearch} statusOptions={searchStatus} />
          }
          total={total ?? "N/A"}
          rightButton={
            <Button onClick={() => handleOpenModal()}>
              <PlusOutlined />
              Billing
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
          modal={
            <CoModal
              visible={modalOpen}
              onClose={handleCloseModal}
              width={"60%"}
              maskClos={false}
              title={"Create Billing"}
            >
              <div className="w-full mt-5">
                <CeFcPayment
                  initialData={{ hc_no: hcID }}
                  onSuccess={() => {
                    handleCloseModal();
                    loadInitialData(searchKey, currentPage);
                  }}
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </CoModal>
          }
        >
          <CtTable
            columns={columns(paymentStatus, handleStatusChange)}
            loading={loading}
            data={data}
            rowKey={(record) => record.payment_no}
          />
        </ClTable>
      </div>
    </div>
  );
};

export default Payment;
