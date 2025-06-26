"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Button } from "antd";
import useNotification from "@/hooks/useNotification";
import { hcRequest } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";
import { columns } from "./RequestColumn";
import { useStatus } from "@/context/initialConfigContext";
import { PlusOutlined } from "@ant-design/icons";

const CoModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoModal),
  { ssr: false }
);
const CeFmRequest = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CeFmRequest),
  { ssr: false }
);

const Request = () => {
  const { hcID } = useParams();
  const { statusRequest } = useStatus();
  const { getRepairs, updateRepairStatus, updateRequestStatus } = hcRequest();

  const { success, error } = useNotification();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleStatusChange = async (requestId, status) => {
    console.log("set", requestId, status);
    setLoading(true);
    try {
      const response = await updateRequestStatus({
        request_no: requestId,
        status: status,
      });
      console.log("response", response);
      if (response.isSuccess) {
        callGetRepair(searchKey, currentPage);
        success({
          message: `Request status updated to ${status}`,
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
        rightButton={
          <Button onClick={() => handleOpenModal()}>
            <PlusOutlined />
            Request
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
            title={"Request"}
          >
            <div className="w-full mt-5">
              <CeFmRequest
                initialData={{ hc_no: hcID }}
                onSuccess={() => {
                  handleCloseModal();
                  callGetRepair(searchKey, currentPage);
                }}
                onClose={() => setModalOpen(false)}
              />
            </div>
          </CoModal>
        }
      >
        <CtTable
          columns={columns(statusRequest, handleStatusChange)}
          data={tableData}
          loading={loading}
          rowKey={(record) => record.request_no}
        />
      </ClTable>
    </div>
  );
};

export default Request;
