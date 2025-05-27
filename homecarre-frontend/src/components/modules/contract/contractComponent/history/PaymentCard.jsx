import React from "react";
import { Row, Col } from "antd";
import PaymentImage from "@/components/modules/payment/paymentComponent/PaymentImage";
import StatusDropdownButton from "@/components/modules/payment/paymentComponent/StatusDropdownButton";

const PaymentCard = ({ payment }) => {
  return (
    <div>
      <Row className="mb-4">
        <Col
          span={20}
          className="flex flex-col items-center justify-start gap-4"
        >
          <p className="text-sm font-light">ID : {payment.payment_no}</p>
          <p className="text-sm font-light">Update Date 12/05/2025 10.25 AM</p>
          <p className="text-sm font-light">
            Due date {payment.agreement_date_pay}
          </p>
          <p className="text-xl font-medium line-clamp-1">
            {payment.account_name}
          </p>
          <p className="text-xl font-medium">{payment.bank_no}</p>
          <p className="text-sm font-light">{payment.bank_name}</p>
        </Col>
        <Col span={4} className="flex content-between justify-end"></Col>
      </Row>
    </div>
  );
};

export default PaymentCard;
