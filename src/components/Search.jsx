"use client";

import { useEffect, useState } from "react";
import debounce from "debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { inputStyles } from "@/components/Input";

import FilterTag from "@/components/FilterTag";
import clsx from "clsx";

const TAGS = ["pitch", "campaign", "job"];

const Search = ({ opportunities, setFilteredOpportunities }) => {
  const [query, setQuery] = useState(null);
  const [selected, setSelected] = useState([]);

  const changeHandler = (e) => {
    const debouncedSearch = debounce(() => setQuery(e.target.value), 500);
    debouncedSearch();
  };

  useEffect(() => {
    setFilteredOpportunities(
      selected.length > 0
        ? opportunities.filter((i) => selected.includes(i.type))
        : opportunities
    );
  }, [selected]);

  return (
    <section>
      <div className="relative z-0 w-full group">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className={clsx(inputStyles.input, "px-4")}
          onChange={changeHandler}
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
        {TAGS.map((tag) => (
          <FilterTag selected={selected} setSelected={setSelected} key={tag}>
            {tag}
          </FilterTag>
        ))}
      </div>
    </section>
  );
};

export default Search;
