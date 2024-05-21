"use client";

import { useState } from "react";

import Search from "@/components/Search";
import OpportunityRow from "../OpportunityRow";
import { Error } from "../Form";

const TableBody = ({ data = [], setError }) => {
  if (data && data.length > 0) {
    return data.map((opportunity) => (
      <OpportunityRow
        setError={setError}
        {...opportunity}
        key={opportunity?.opportunity_id}
      />
    ));
  }

  return (
    <tr>
      <td colSpan="7" className="text-center">
        No opportunities found
      </td>
    </tr>
  );
};

const AdminOpportunitiesSearch = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [errors, setError] = useState({});

  return (
    <>
      <Search
        data={opportunities}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "project", "name"], tag: "type" }}
      />

      <div className="my-12 space-y-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created By
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  Applications
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <TableBody
                data={filteredOpportunities}
                errors={errors}
                setError={setError}
              />
            </tbody>
          </table>
        </div>
        {errors?.message && <Error>{errors?.message}</Error>}
      </div>
    </>
  );
};

export default AdminOpportunitiesSearch;
