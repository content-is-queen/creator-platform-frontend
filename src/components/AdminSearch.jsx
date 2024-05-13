"use client";

import { useEffect, useState } from "react";
import debounce from "debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { inputStyles } from "@/components/Form";

import FilterTag from "@/components/FilterTag";
import clsx from "clsx";

const AdminSearch = ({ searchQuery }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);
  const debouncedSearchQuery = debounce(searchQuery, 1000);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    debouncedSearchQuery(inputValue);
  };

  return (
    <section className="pb-4">
      <div className="relative z-0 w-full group">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className={clsx(inputStyles.input, "px-4")}
          onChange={handleInputChange}
        />

        <FontAwesomeIcon
          className="absolute right-0 h-4 w-4 -translate-y-1/2 top-1/2"
          icon={faSearch}
        />
      </div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex gap-2 mt-6">
        {tags.map((tag) => (
          <FilterTag selected={selected} setSelected={setSelected} key={tag}>
            {tag}
          </FilterTag>
        ))}
      </div>
    </section>
  );
};

export default AdminSearch;
