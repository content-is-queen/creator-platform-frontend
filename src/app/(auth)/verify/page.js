import { Suspense } from "react";

import Heading from "@/components/Heading";
import VerifyForm from "@/components/VerifyForm";

const Verify = () => (
  <div className="text-center">
    <Heading size="3xl" className="mb-2">
      Verify your email address
    </Heading>
    <p className="mb-6">
      We're sure you're you, but we still need to verify that.
    </p>

    <Suspense>
      <VerifyForm />
    </Suspense>
  </div>
);

export default Verify;

export const metadata = {
  title: "Verify",
};
