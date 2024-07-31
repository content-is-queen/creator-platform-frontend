"use client";

import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="text-sm inline-flex items-center gap-1.5"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" /> Go back
    </button>
  );
};

export default BackButton;
