"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Row, Col, Tag, Button } from "antd";

import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";
import PaginationTemp from "@ui/paginationTemp";

import { columns } from "../adminColumns/paymentColumn";

import PaymentService from "@/services/admin/paymentService";

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
      <Row className="flex sm:justify-between items-end">
        <Col span={20}>
          <Col span={24}>
            <SearchTemp onSearch={handleSearch} />
          </Col>
          <Col span={12}>
            <Tag>{`total : ${data?.total ?? "N/A"}`}</Tag>
          </Col>
        </Col>
        <Col>
          <Button color="cyan" variant="solid">
            create for {month}
          </Button>
        </Col>
      </Row>
      <TableTemp
        columns={columns}
        loading={loading}
        data={data.data}
        rowKey={(record) => record.hc_no}
      />
      <Row justify={"end"} className="my-10">
        <PaginationTemp
          default={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          className="mt-4 text-center"
        />
      </Row>
    </div>
  );
};

export default Payment;
