"use client";

import { useEffect, useState } from "react";
import debounce from "debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { inputStyles } from "@/components/Form";

import FilterTag from "@/components/FilterTag";
import clsx from "clsx";

const Search = ({ data = [], setFilteredData, filter }) => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const changeHandler = (e) => {
    const debouncedSearch = debounce(() => setQuery(e.target.value), 500);
    debouncedSearch();
  };

  const buildTags = (data) => {
    const tags = [];

    data.forEach((tag) => {
      // Prevent duplicates
      if (!tags.includes(tag[filter.tag])) tags.push(tag[filter.tag]);
    });

    return tags;
  };

  useEffect(() => {
    setFilteredData(() => {
      if (query.trim().length === 0) {
        return data;
      }

      return data.filter((i) => {
        let filterData = false;

        filter.keys.forEach((key) => {
          if (filterData) return;

          if (i[key]?.toLowerCase().includes(query.toLowerCase())) {
            filterData = true;
          }
        });
        return filterData;
      });
    });
  }, [query]);

  useEffect(() => {
    setTags(buildTags(data));
  }, []);

  useEffect(() => {
    setFilteredData(
      selectedTags.length > 0
        ? data.filter((i) => selectedTags.includes(i[filter.tag]))
        : data
    );
  }, [selectedTags]);

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
        {/** Only show tags if there are more than one */}
        {tags.length > 1 &&
          tags.map((tag) => (
            <FilterTag
              selected={selectedTags}
              setSelected={setSelectedTags}
              key={tag}
            >
              {tag}
            </FilterTag>
          ))}
      </div>
    </section>
  );
};

export default Search;
