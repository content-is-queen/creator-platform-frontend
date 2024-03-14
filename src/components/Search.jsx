"use client";

import { useEffect, useState } from "react";
import debounce from "debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Input from "@/components/Input";
import FilterTag from "@/components/FilterTag";

const Search = ({ tags }) => {
  const [query, setQuery] = useState(null);

  const changeHandler = (e) => {
    const debouncedSearch = debounce(() => setQuery(e.target.value), 500);
    debouncedSearch();
  };

  useEffect(() => {}, [query]);

  return (
    <section>
      <Input
        type="search"
        name="search"
        placeholder="Search"
        label={false}
        className="mb-5"
        onChange={changeHandler}
        icon={
          <FontAwesomeIcon
            className="absolute right-0 h-4 w-4 -translate-y-1/2 top-1/2"
            icon={faSearch}
          />
        }
      >
        Search
      </Input>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <FilterTag>{tag}</FilterTag>
        ))}
      </div>
    </section>
  );
};

export default Search;
