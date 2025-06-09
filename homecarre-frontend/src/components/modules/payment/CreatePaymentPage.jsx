import React from "react";
import CreateFromPayment from "./paymentComponent/CreateFromPayment";

const CreatePaymentPage = () => {
  return (
    <div>
      <h3>create a billing </h3>
      <div className="bg-background w-full rounded flex justify-center mt-5">
        <div className="w-1/2 h-max my-10">
          <CreateFromPayment />
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentPage;
