"use client";

import Button from "@/components/Button";
import Subheading from "@/components/Subheading";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
      }}
      className="flex justify-center items-center py-12 text-center bg-queen-blue space-y-4"
    >
      <Subheading size="lg" className="text-white">
        Something went wrong!
      </Subheading>
      <Button
        as="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfwN92N5z_S7CC_VDt1_S3Xv0HuWatRZWkC_hYdBhSaA5LECA/viewform"
      >
        Report bug
      </Button>
    </div>
  );
}
