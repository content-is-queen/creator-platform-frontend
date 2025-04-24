"use client";

import Button from "@/components/Button";
import Subheading from "@/components/Subheading";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
      }}
      className="flex justify-center items-center py-12 text-center   "
    >
      <div className="space-y-4">
        <Subheading size="2xl">Something went wrong!</Subheading>
        <Button
          as="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfwN92N5z_S7CC_VDt1_S3Xv0HuWatRZWkC_hYdBhSaA5LECA/viewform"
        >
          Report bug
        </Button>
      </div>
    </div>
  );
}
