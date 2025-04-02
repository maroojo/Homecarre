"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Row, Col, Tag, Button } from "antd";
import { columns } from "@admin/adminColumns/clientColumn";
import SearchTemp from "@ui/searchTemp";
import TableTemp from "@ui/tableTemp";

import ClientService from "@/services/admin/clientService";
import PaginationTemp from "@/components/ui/paginationTemp";
const ModalTemp = dynamic(() => import("@ui/modalTemp"), {
  ssr: false,
});
const ClientForm = dynamic(
  () => import("@admin/clientAccount/clientComponent/ClientForm"),
  { ssr: false }
);

const ClientAccount = () => {
  const { getClients, getClient } = ClientService();
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
      <Row gutter={[16, 24]} align={"bottom"}>
        <Col span={20}>
          <Col span={24}>
            <SearchTemp onSearch={handleSearch} />
          </Col>
          <Col span={12}>
            <Tag>{`total : ${data?.total ?? "N/A"}`}</Tag>
          </Col>
        </Col>
        <Col span={3} className="mr-3 text-right">
          <Button onClick={() => handleOpenModal(null)}>add</Button>
        </Col>
      </Row>
      <TableTemp
        columns={columns(handleOpenModal)}
        data={data.data}
        loading={loading}
        rowKey={(record) => record.client_code}
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
      <ModalTemp
        visible={modalOpen}
        onClose={handleCloseModal}
        width={"40%"}
        maskClos={false}
      >
        <div className="mx-24 ">
          <ClientForm id={selectedRecord} onClose={() => setModalOpen(false)} />
        </div>
      </ModalTemp>
    </div>
  );
};

export default ClientAccount;
