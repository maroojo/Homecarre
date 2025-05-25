import { Dropdown } from "antd";
import React, { useState } from "react";

const StatusDropdownButton = ({
  text,
  statusList,
  record,
  onChange,
  setOpenModal,
}) => {
  const color = (text) => {
    switch (text) {
      case "new":
        return "bg-state-danger";
      case "paid":
        return "bg-state-info";
      case "over due":
        return "bg-state-warning";
      case "received":
        return "bg-state-success";
      default:
        return "bg-state-ignore";
    }
  };
  const [open, setOpen] = useState(false);

  const handleMenuClick = ({ key }) => {
    onChange(record.payment_no, key);
    setOpenModal(true);
  };

  const handleOnClick = () => {
    setOpen((prev) => !prev);
  };

  const statusItem = statusList.find((s) => s.code === text);
  const colorClass = statusItem?.colorClass || "bg-state-ignore";
  const label = statusItem?.label || text;

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        onClick: handleMenuClick,
        items: statusList.map((item) => ({
          key: item.code,
          label: item.label,
        })),
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <div
          className={`w-25 h-6 rounded-full text-xs text-text-w font-medium cursor-pointer flex items-center justify-center ${color(
            text
          )} hover:bg-neutral-600`}
        >
          {label}
        </div>
      </a>
    </Dropdown>
  );
};

export default StatusDropdownButton;
