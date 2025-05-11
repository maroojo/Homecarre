"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { LTable, TSearch, TTable, TPagination } from "@homecarre-ui";

import { columns } from "./paymentComponent/paymentColumn";

import PaymentService from "@/services/payment/paymentService";

import { useAuth } from "@/context/AuthContext";

const Payment = () => {
  const { user } = useAuth();
  const { getPayment } = PaymentService();
  const date = dayjs();
  const month = date.format("MMM");
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetPayment = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getPayment(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getPayment(page, pageSize);
      }
      if (response) {
        setData(response);
        setTotal(response.total || 0);
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

  useEffect(() => {
    callGetPayment(searchKey);
  }, [searchKey]);

  return (
    <div>
      <LTable
        onSearch={<TSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        rightButton={
          <Button variant="solid">
            <PlusOutlined /> {month}
          </Button>
        }
        pagination={
          <TPagination
            default={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            className="mt-4 text-center"
          />
        }
      >
        <TTable
          columns={columns}
          loading={loading}
          data={data.data}
          rowKey={(record) => record.payment_no}
        />
      </LTable>
    </div>
  );
};

export default Payment;
