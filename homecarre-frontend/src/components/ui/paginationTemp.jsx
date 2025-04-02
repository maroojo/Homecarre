import React from "react";
import { Pagination } from "antd";

const PaginationTemp = ({
  default: defaultPage,
  pageSize,
  total,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <Pagination
        defaultCurrent={defaultPage}
        pageSize={pageSize}
        total={total}
        showTotal={(total) => `Total ${total} items`}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationTemp;
