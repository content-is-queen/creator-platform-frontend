"use client";

import { useEffect, useRef, useState } from "react";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";
import OpportunityRow from "../OpportunityRow";

const OpportunitiesSearchAdmin = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    setFilteredOpportunities(opportunities);
  }, []);

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
      />

      <div className="my-12 space-y-6">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Created By
                </th>
                <th scope="col" class="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" class="px-6 py-3">
                  Applications
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length > 0 ? (
                filteredOpportunities?.map((opportunity) => (
                  <OpportunityRow
                    {...opportunity}
                    key={opportunity.opportunity_id}
                  />
                ))
              ) : (
                <div className="text-center">No opportunities found</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OpportunitiesSearchAdmin;
