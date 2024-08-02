"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

const ButtonExternal = () => (
  <Button
    as="a"
    href={link}
    target="_blank"
    onClick={() =>
      sendGAEvent({ event: "view_external_opportunity", value: link })
    }
    className="items-center inline-flex gap-1"
  >
    Apply
    <FontAwesomeIcon className="h-2.5" icon={faExternalLink} />
  </Button>
);

export default ButtonExternal;
