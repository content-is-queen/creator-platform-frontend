"use client";

import Subheading from "@/components/Subheading";
import Text from "@/components/Text";
import { useEffect } from "react";

export default function NotFound({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
      }}
      className="flex justify-center items-center py-12 text-center bg-queen-blue"
    >
      <div className="space-y-4">
        <Subheading size="2xl" className="text-white">
          Something went wrong!
        </Subheading>
        <Text>Page not found</Text>
      </div>
    </div>
  );
}
