import { Button, Tag } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "User ID",
    dataIndex: "id",
    key: "id",
    className: "w-20",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Social ID",
    dataIndex: "socialId",
    key: "socialId",
    className: "max-w-48",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    className: "w-5",
    render: (text) => (
      <Tag className="line-clamp-1 h-[3rem] text-left">{text}</Tag>
    ),
  },
  {
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    className: "w-5",
    render: (text) => (
      <Tag className="line-clamp-1 h-[3rem] text-left">{text}</Tag>
    ),
  },
  {
    title: "Property",
    dataIndex: "property",
    key: "property",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    className: "w-12",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    className: "w-24",
    render: (_, record) => (
      <div>
        <Button type="link" onClick={() => console.log(record)}>
          <EditOutlined className="cursor-pointer p-1 bg-primary" />
        </Button>
        <Button type="link" onClick={() => console.log(record)}>
          <CloseOutlined className="cursor-pointer p-1 bg-primary" />
        </Button>
      </div>
    ),
  },
];
