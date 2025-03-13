import Header from "./RegisterComponents/header";
import RegisterForm from "@/components/pages/customer/register/RegisterComponents/registerForm";
import RegisterComplete from "./RegisterComponents/registerComplete";

import { Button, Grid, Row } from "antd";

const closeLiff = () => {};

const Register = () => {
  return (
    <div className="flex flex-col w-screen h-fit content-evenly">
      <Header />
      {/* <RegisterComplete /> */}
      <RegisterForm />
      {/* <Button
        color="danger"
        variant="solid"
        shape="round"
        className="w-1/2 py-2 px-4"
      >
        close
      </Button> */}
    </div>
  );
};
export default Register;
