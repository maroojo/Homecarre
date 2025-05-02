import { Row, Col, Tag } from "antd";

const LayoutTablePage = ({
  onSearch,
  total,
  rightButton,
  children,
  pagination,
  modal,
}) => {
  return (
    <div>
      <Row className="flex sm:justify-between items-end">
        <Col span={20}>
          <Col span={24}>{onSearch}</Col>
          <Col span={12}>
            <Tag>{`total : ${total}`}</Tag>
          </Col>
        </Col>
        <Col>{rightButton}</Col>
      </Row>

      <div className="mt-5">
        {children}
        {pagination && (
          <Row justify={"end"} className="my-10">
            {pagination}
          </Row>
        )}
      </div>

      {Array.isArray(modal)
        ? modal.map((m, i) => <div key={i}>{m}</div>)
        : modal}
    </div>
  );
};

export default LayoutTablePage;
