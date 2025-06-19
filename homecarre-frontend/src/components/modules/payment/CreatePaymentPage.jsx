import React from "react";
import CreateFromPayment from "./paymentComponent/CreateFromPayment";

const CreatePaymentPage = () => {
  return (
    <div>
      <h3>create a billing </h3>
      <div className="bg-background w-full rounded flex justify-start mt-5">
        <div className="w-full h-max m-10">
          <CreateFromPayment />
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentPage;
