import { Suspense } from "react";

import Heading from "@/components/Heading";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Heading>Reset password</Heading>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
};

export default ResetPassword;
