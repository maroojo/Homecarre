import { Button, Tag, Space } from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const columns = (handleOpenModal) => [
  {
    title: "User ID",
    dataIndex: "client_code",
    key: "id",
    className: "w-28",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Name",
    dataIndex: "fullname",
    key: "name",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Contact",
    key: "contact",
    render: (_, record) => {
      const contacts = [
        { icon: <MailOutlined />, value: record.email },
        { icon: <PhoneOutlined />, value: record.telephone },
        { icon: <TwitterOutlined />, value: record.line },
        { icon: <WhatsAppOutlined />, value: record.whatsapp },
      ].filter((item) => item.value);
      return (
        <div className="flex flex-col text-xs">
          {contacts.map((contact, index) => (
            <Space key={index} className="flex items-center gap-1">
              {contact.icon} {contact.value}
            </Space>
          ))}
        </div>
      );
    },
  },
  {
    title: "Owner",
    dataIndex: "client_type",
    key: "owner",
    className: "w-5",
    render: (text) => (
      <Tag className="line-clamp-1 h-[3rem] text-left">
        {text === "owner" ? text : ""}
      </Tag>
    ),
  },
  {
    title: "Tenant",
    dataIndex: "client_type",
    key: "tenant",
    className: "w-5",
    render: (text) => (
      <Tag className="line-clamp-1 h-[3rem] text-left">
        {text === "tenant" ? text : ""}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "client_status",
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
        <Button type="link" onClick={() => handleOpenModal(record)}>
          <EditOutlined className="cursor-pointer p-1 rounded" />
        </Button>
      </div>
    ),
  },
];
