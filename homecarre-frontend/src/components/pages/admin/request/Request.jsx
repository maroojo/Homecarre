"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Tag } from "antd";

import RepairService from "@/services/admin/repairService";

import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";
import ModalTemp from "@ui/modalTemp";
import PaginationTemp from "@ui/paginationTemp";

import { columns } from "../adminColumns/requestColumn";

const Request = () => {
  const { getRepairs } = RepairService();

  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const callGetRepair = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getRepairs(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getRepairs(page, pageSize);
      }
      if (response) {
        setData(response);
        setTotal(response.total || 0);
        console.log(response);
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
    callGetRepair(searchKey);
  }, [searchKey]);

  const tableData = data ? data.data : [];
  
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
      </Row>
      <TableTemp
        columns={columns}
        data={tableData}
        loading={loading}
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
export default Request;
