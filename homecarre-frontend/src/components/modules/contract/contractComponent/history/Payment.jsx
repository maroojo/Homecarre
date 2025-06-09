"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { hcPayment } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./PaymentColumn";
import useNotification from "@/hooks/useNotification";

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

  useEffect(() => {
    if (hcID) {
      loadInitialData(searchKey, currentPage);
    }
    console.log("first", hcID);
  }, []);
  return (
    <div>
      <div>
        {/* {data.map((item) => (
          <PaymentCard 
            key={item.payment_no}
            payment={item}
          />
        ))} */}
        <ClTable
          onSearch={
            <CtSearch onSearch={handleSearch} statusOptions={searchStatus} />
          }
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
