import Heading from "@/components/Heading";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <Heading>Forgot password</Heading>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;

export const metadata = {
  title: "Forgot Password",
};
