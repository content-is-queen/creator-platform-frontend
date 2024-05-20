"use client";

import { useEffect, useState } from "react";
import debounce from "debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { inputStyles } from "@/components/Form";

import FilterTag from "@/components/FilterTag";
import clsx from "clsx";

const Search = ({ data, setFilteredData }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);

  const changeHandler = (e) => {
    const debouncedSearch = debounce(() => setQuery(e.target.value), 500);
    debouncedSearch();
  };

  const getTags = (data) => {
    const tags = [];

    data.map(({ type }) => {
      if (!tags.includes(type)) tags.push(type);
    });

    return tags;
  };

  useEffect(() => {
    if (query) {
      setFilteredData(() => {
        if (query.trim().length === 0) {
          return data;
        }

        return data.filter(
          (i) =>
            i.title?.toLowerCase().includes(query.toLowerCase()) ||
            i.project?.toLowerCase().includes(query.toLowerCase()) ||
            i.name?.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
  }, [query]);

  useEffect(() => {
    setTags(getTags(data));
  }, []);

  useEffect(() => {
    setFilteredData(
      selected.length > 0 ? data.filter((i) => selected.includes(i.type)) : data
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
        {tags.map((tag) => (
          <FilterTag selected={selected} setSelected={setSelected} key={tag}>
            {tag}
          </FilterTag>
        ))}
      </div>
    </section>
  );
};

export default Search;
