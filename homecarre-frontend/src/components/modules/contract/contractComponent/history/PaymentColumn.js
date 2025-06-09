import { Space } from "antd";
import StatusDropdownButton from "@modules/payment/paymentComponent/StatusDropdownButton";
import PaymentImage from "@modules/payment/paymentComponent/PaymentImage";

export const columns = (status = [], onChangeStatus) => [
  {
    title: "Payment No.",
    dataIndex: "payment_no",
    key: "id",
    className: "w-28",
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
    title: "Due Date",
    key: "date",
    render: (_, record) => {
      const days = [
        { value: <div>pay {record.agreement_date_pay}</div> },
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
    title: "slip",
    dataIndex: "upload",
    key: "upload",
    render: (text) =>
      text ? (
        <div data-stop-propagation>
          <PaymentImage text={text} />
        </div>
      ) : (
        ""
      ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <div data-stop-propagation>
        <StatusDropdownButton
          text={text}
          statusList={status}
          record={record}
          onChange={onChangeStatus}
        />
      </div>
    ),
  },
];
