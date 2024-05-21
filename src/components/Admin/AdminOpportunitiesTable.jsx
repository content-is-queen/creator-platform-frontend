"use client";

import { useState, useEffect } from "react";

import useToken from "@/hooks/useToken";
import API from "@/api/api";

import Search from "@/components/Search";
import OpportunityRow from "./AdminOpportunityTableRow";
import { Error } from "../Form";

const TableBody = (props) => {
  const { data } = props;
  if (data && data.length > 0) {
    return data.map((opportunity) => (
      <OpportunityRow
        {...props}
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

const AdminOpportunitiesTable = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [errors, setError] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  const { token } = useToken();

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        await API.delete(`/opportunities/opportunityid/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.reload();
      }
    } catch (error) {
      setError({
        message: `Something went wrong when deleting the opportunity`,
      });
      console.error(error);
    }
  };

  const handleCheckAll = () => {
    const deselect = selectedOpportunities.length === opportunities.length;

    deselect
      ? setSelectedOpportunities(() => {
          setCheckAll(false);
          return [];
        })
      : setSelectedOpportunities(
          opportunities.map((opportunity) => {
            setCheckAll(true);
            return opportunity.opportunity_id;
          })
        );
  };

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
                      checked={checkAll}
                      onClick={() => handleCheckAll()}
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
                handleDelete={handleDelete}
                setSelectedOpportunities={setSelectedOpportunities}
                selectedOpportunities={selectedOpportunities}
              />
            </tbody>
          </table>
        </div>
        {errors?.message && <Error>{errors?.message}</Error>}
      </div>
    </>
  );
};

export default AdminOpportunitiesTable;
