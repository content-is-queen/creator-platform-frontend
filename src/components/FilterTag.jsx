"use client";

import clsx from "clsx";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterTag = ({ children }) => {
  const [selected, setSelected] = useState(false);

  const clickHandler = () => {
    setSelected(!selected);
  };

  return (
    <button
      type="button"
      onClick={clickHandler}
      className={clsx(
        "uppercase font-medium rounded-full text-xs px-3 py-0.5",
        selected
          ? "bg-queen-yellow text-queen-black"
          : "border border-queen-black/60 text-queen-black/60",
      )}
    >
      {children} {selected && <FontAwesomeIcon icon={faXmark} />}
    </button>
  );
};

export default FilterTag;
