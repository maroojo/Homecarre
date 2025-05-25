"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Form,
  Tabs,
  Input,
  Card,
  DatePicker,
  Typography,
  message,
  Upload,
  Button,
  Spin,
} from "antd";
import { UploadOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { hcContract } from "@homecarre-api";
import InformationTabs from "./InformationForm/InformationTabs";

const ContractDetail = ({ hcId }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const { getContractById, updateContract } = hcContract();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [tenantCode, setTenantCode] = useState([]);
  const [ownerCode, setOwnerCode] = useState([]);

  const getContract = async () => {
    setLoading(true);
    try {
      const response = await getContractById(hcId);
      if (response?.data) {
        // setData(response.data);
        setTenantCode(response.data.tenant_code);
        setOwnerCode(response.data.owner_code);
        form.setFieldsValue({
          HCNo: response.data.hc_no,
          propertyCode: response.data.property_code,
          owner: response.data.owner_name,
          tenant: response.data.tenant_name,
          time: response.data.agreement_lease,
          agreementDatePay: response.data.agreement_date_pay,
          rentPrice: response.data.rent_price,
          bank: response.data.bank_name,
          accountName: response.data.account_name,
          accountNo: response.data.bank_no,
          dateRange: [
            dayjs(response.data.date_start, dateFormat),
            dayjs(response.data.date_end, dateFormat),
          ],
        });
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      // handleSave();
    }
    setIsEdit(!isEdit);
  };

  const hideButton = activeTabKey === "4" || activeTabKey === "5";

  useEffect(() => {
    form.resetFields();
    setLoading(true);
    setIsEdit(false);
    if (hcId) {
      getContract();
    }
  }, [hcId]);

  return (
    <div>
      <div className="flex items-end justify-start gap-4">
        <h2 className="text-xl font-semibold">Contract Information</h2>
      </div>
      <div className="mt-2">
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            disabled={!isEdit}
            initialValues={{
              dateRange: [
                data?.date_start ? dayjs(data.date_start, "YYYY-MM-DD") : null,
                data?.date_end ? dayjs(data.date_end, "YYYY-MM-DD") : null,
              ],
            }}
          >
            <Tabs
              items={InformationTabs}
              defaultActiveKey="1"
              onChange={(key) => setActiveTabKey(key)}
            />
          </Form>
          {!hideButton && (
            <Button
              type="primary"
              icon={isEdit ? <SaveOutlined /> : <EditOutlined />}
              onClick={toggleEdit}
              color={isEdit ? "green" : "blue"}
              variant="solid"
            >
              {isEdit ? "Save" : "Edit"}
            </Button>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default ContractDetail;
