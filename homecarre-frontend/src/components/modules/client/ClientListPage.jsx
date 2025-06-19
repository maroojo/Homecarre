"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { columns } from "./clientComponent/clientColumn";
import { hcClients } from "@homecarre-api";
import { ClTable, CtSearch, CtTable, CtPagination } from "@homecarre-ui";

//#region lazy load
const CoModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoModal),
  { ssr: false }
);
const ClientForm = dynamic(
  () => import("@/components/modules/client/clientComponent/ClientForm"),
  { ssr: false }
);
//#endregion lazy load

const ClientListPage = () => {
  const { getClients, getClient } = hcClients();
  const [searchKey, setSearchKey] = useState({ keyword: "", date: "" });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const callGetClients = async (searchParams, page = 1) => {
    setLoading(true);
    try {
      let response;
      if (searchParams.keyword || searchParams.date) {
        response = await getClient(
          searchParams.keyword,
          searchParams.date || [],
          page,
          pageSize
        );
      } else {
        response = await getClients(page, pageSize);
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
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    callGetClients(searchKey, page);
  };

  const handleOpenModal = (record = null) => {
    if (record) {
      const selectedRecord = {
        client_code: record.client_code,
        fullname: record.fullname,
        telephone: record.telephone,
        client_type: record.client_type,
      };
      setSelectedRecord(selectedRecord);
    } else {
      setSelectedRecord(record);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  useEffect(() => {
    callGetClients(searchKey);
  }, [searchKey]);

  return (
    <div>
      <ClTable
        onSearch={<CtSearch onSearch={handleSearch} />}
        total={data?.total ?? "N/A"}
        rightButton={
          <Button onClick={() => handleOpenModal(null)}>
            <PlusOutlined />
            add
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
            width={"40%"}
            maskClos={false}
          >
            <div className="mx-24 ">
              <ClientForm
                id={selectedRecord}
                onClose={() => setModalOpen(false)}
              />
            </div>
          </CoModal>
        }
      >
        <CtTable
          columns={columns(handleOpenModal)}
          data={data.data}
          loading={loading}
          rowKey={(record) => record.client_code}
        />
      </ClTable>
    </div>
  );
};

export default ClientListPage;
