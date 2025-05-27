"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Row, Col } from "antd";
import PaymentCard from "./PaymentCard";
import { hcPayment } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./PaymentColumn";

const Payment = () => {
  const { hcID } = useParams();
  const { getPayment, getPaymentStatus, updatePaymentStatus } = hcPayment();
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
    console.log("status change", paymentId, status);
    console.log("status", data.status);
    setSelectedPayment(paymentId);
    setSelectedStatus(status);
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
          // rightButton={
          //   <Button variant="solid">
          //     <PlusOutlined /> {month}
          //   </Button>
          // }
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
