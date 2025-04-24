"use client";

import Subheading from "@/components/Subheading";
import Text from "@/components/Text";
import { useEffect } from "react";

export default function NotFound({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center absolute w-full h-full py-12 text-center">
      <div className="space-y-2">
        <Subheading size="4xl">404</Subheading>
        <Text color="muted" size="xl">
          The page you requested could not be found
        </Text>
      </div>
    </div>
  );
}
