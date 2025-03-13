import React, { useState } from "react";
import Link from "next/link";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";

//#region items
const items = [
  {
    key: "1",
    label: <Link href="/repair">repair</Link>,
  },
  {
    key: "2",
    label: <Link href="/billing">billing</Link>,
  },
  {
    key: "3",
    label: <Link href="/document">document</Link>,
  },
  {
    key: "4",
    label: <Link href="/about homecarre">about homecarre</Link>,
  },
  {
    key: "5",
    label: <Link href="/help center">help center</Link>,
  },
];
//#endregion items

const Sidebar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="flex items-center justify-between p-1 text-white">
      <MenuOutlined className="text-2xl cursor-pointer" onClick={showDrawer} />
      <Drawer
        className="w-1/2"
        title={
          <div className="flex justify-between w-full">
            <Link href="/">HomeCarre</Link>
            <CloseOutlined onClick={onClose} />
          </div>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Menu mode="vertical" items={items} />
      </Drawer>
    </div>
  );
};

export default Sidebar;
