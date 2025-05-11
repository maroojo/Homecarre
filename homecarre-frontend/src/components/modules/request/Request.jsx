"use client";

import React, { useEffect, useState } from "react";

import RepairService from "@/services/request/requestService";
import { hcRequest } from "@homecarre-api";

import { LTable, TSearch, TTable, TPagination } from "@homecarre-ui";

import { columns } from "./requestComponent/requestColumn";

const Request = () => {
  const { getRepairs } = hcRequest();

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
      <LTable
        onSearch={<TSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
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
          data={tableData}
          loading={loading}
          rowKey={(record) => record.request_no}
        />
      </LTable>
    </div>
  );
};
export default Request;
