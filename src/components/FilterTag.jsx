"use client";

import clsx from "clsx";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterTag = ({ children, selected, setSelected }) => {
  const clickHandler = () => {
    setSelected((prev) => {
      if (prev.includes(children)) {
        return prev.filter((i) => i !== children);
      } else {
        return [...prev, children];
      }
    });
  };

  return (
    <button
      type="button"
      onClick={clickHandler}
      className={clsx(
        "uppercase font-medium rounded-full text-xs px-3 py-0.5",
        selected.includes(children)
          ? "bg-queen-yellow text-queen-black"
          : "border border-queen-black/60 text-queen-black/60 hover:bg-queen-white-dark"
      )}
    >
      {children}{" "}
      {selected.includes(children) && <FontAwesomeIcon icon={faXmark} />}
    </button>
  );
};

export default FilterTag;
