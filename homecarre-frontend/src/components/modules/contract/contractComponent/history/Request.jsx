"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useNotification from "@/hooks/useNotification";
import { hcRequest } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./RequestColumn";

const Status = [
  { code: "New", label: "New", colorClass: "bg-red-500" },
  { code: "Deny", label: "Deny", colorClass: "bg-gray-400" },
  { code: "Accept", label: "Accept", colorClass: "bg-yellow-400" },
  { code: "Done", label: "Done", colorClass: "bg-green-500" },
];

const Request = () => {
  const { hcID } = useParams();
  const { getRepairs, updateRepairStatus } = hcRequest();

  const { isSuccess, error } = useNotification();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
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
        response = await getRepairs({ page, pageSize, hc_no: hcID });
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
    callGetRepair(searchKey, page);
  };

  const handleStatusChange = async (Id, status) => {
    setLoading(true);
    try {
      const response = await updateRepairStatus({
        request_no: Id,
        status: status,
      });
      console.log("response", response);
      if (response.isSuccess) {
        callGetRepair(searchKey, currentPage);
        isSuccess({
          message: `Payment status updated to ${status}`,
          onClose: () => {},
        });
      } else {
        console.error("Error updating status:", response.message);
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
    callGetRepair(searchKey);
  }, [searchKey]);

  const tableData = data ? data.data : [];

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
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
          columns={columns(Status, handleStatusChange)}
          data={tableData}
          loading={loading}
          rowKey={(record) => record.request_no}
        />
      </ClTable>
    </div>
  );
};

export default Request;
