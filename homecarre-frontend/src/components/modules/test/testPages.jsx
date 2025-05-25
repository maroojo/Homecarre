"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "antd";
import MyTabs from "./testmodal";

const CoModal = dynamic(
  () => import("@homecarre-ui").then((mod) => mod.CoModal),
  { ssr: false }
);

const TestPages = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleModal}>test</Button>
      <CoModal
        visible={open}
        onClose={() => setOpen(false)}
        title="Test Modal"
        width={800}
        maskClos={false}
      >
        <MyTabs />
      </CoModal>
    </div>
  );
};

export default TestPages;
