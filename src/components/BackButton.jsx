"use client";

import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const router = useRouter();

  const redirect = () => {
    router.back() ? router.back() : router.push("/opportunities");
  };

  return (
    <button
      onClick={redirect}
      className="text-sm inline-flex items-center gap-1.5 hover:underline"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" /> Go back
    </button>
  );
};

export default BackButton;
