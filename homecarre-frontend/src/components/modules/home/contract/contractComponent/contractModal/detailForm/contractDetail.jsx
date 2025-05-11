import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
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
import dayjs from "dayjs";
import { hcContract } from "@homecarre-api";

const contractDetail = () => {
    const [form] = Form.useForm();
    const { getContractById,updateContract } = hcContract();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [tenantCode, setTenantCode] = useState([]);   
    const [ownerCode, setOwnerCode] = useState([]);

  return loading?(
    <div>contractDetail</div>
  ):(
    <div>
        
    </div>
  )
}

export default contractDetail