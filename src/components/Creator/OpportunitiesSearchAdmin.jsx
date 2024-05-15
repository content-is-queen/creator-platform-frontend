"use client";

import { useEffect, useRef, useState } from "react";
import Search from "@/components/Search";
import OpportunityRow from "../OpportunityRow";
import useToken from "@/hooks/useToken";
import API from "@/api/api";
import { getOpportunities } from "@/utils";

const OpportunitiesSearchAdmin = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [errors, setError] = useState({});
  const { token } = useToken();

  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredOpportunities(opportunities);
  }, []);

  const handleclose = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(filteredOpportunities);

  const handleIdToDelete = async (id) => {
    setError({});
    try {
      const response = await API(`/opportunities/opportunityid/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status > 200) {
        setError({
          message:
            response?.message || "Something went wrong. User sign up failed.",
        });
        return;
      }
      if (response.status === 200) {
        await getOpportunities();
      }
    } catch (error) {}
  };

  const subMenuToggle = (id) => {
    setOpenSubMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
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
              {opportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <OpportunityRow
                    {...opportunity}
                    key={opportunity.opportunity_id}
                    setIdToDelete={handleIdToDelete}
                    isOpen={handleclose}
                    subMenuToggle={() =>
                      subMenuToggle(opportunity.opportunity_id)
                    }
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No opportunities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {errors?.message && (
          <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
            <p>{errors?.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OpportunitiesSearchAdmin;
