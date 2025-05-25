import { Space, Dropdown } from "antd";
import StatusDropdownButton from "./StatusDropdownButton";

export const columns = (status = [], onChangeStatus,setOpenModal) => [
  {
    title: "Payment ID",
    dataIndex: "payment_no",
    key: "id",
    className: "w-28",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "HC No.",
    dataIndex: "hc_no",
    key: "hcNo",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Detail",
    key: "detail",
    render: (_, record) => {
      const details = [
        { value: record.bank_name },
        { value: record.account_name },
        { value: record.bank_no },
      ].filter((item) => item.value);
      return (
        <div className="flex flex-col text-xs">
          {details.map((detail, index) => (
            <Space key={index} className="flex items-center gap-1">
              {detail.value}
            </Space>
          ))}
        </div>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "rent_price",
    key: "amount",
    className: "max-w-48",
    render: (text) => (
      <div className="line-clamp-1 h-[3rem] text-left">{text}</div>
    ),
  },
  {
    title: "Date",
    key: "date",
    render: (_, record) => {
      const days = [
        { value: record.agreement_date_pay },
        { value: record.schedule_date },
      ].filter((item) => item.value);
      return (
        <div className="flex flex-col text-xs">
          {days.map((date, index) => (
            <Space key={index} className="flex items-center gap-1">
              {date.value}
            </Space>
          ))}
        </div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <StatusDropdownButton
        text={text}
        statusList={status}
        record={record}
        onChange={onChangeStatus}
        setOpenModal={setOpenModal}
      />
    ),
  },
];
