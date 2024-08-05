"use client";

import { useState, useEffect } from "react";

import API from "@/api/api";

import Search from "@/components/Search";
import AdminOpportunitiesRow from "./AdminOpportunitiesTableRow";
import Table from "../Table";
import { Error } from "../Form";

const AdminOpportunitiesTable = ({ opportunities }) => {
  const [loading, setLoading] = useState(true);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    setFilteredOpportunities(opportunities);
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        await API.delete(`/opportunities/opportunityid/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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

  return (
    <>
      <Search
        data={opportunities}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "project", "name"], tag: "type" }}
      />

      <div className="mt-8 space-y-6">
        {error?.message && <Error>{error?.message}</Error>}

        <Table>
          <Table.Head>
            <tr>
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
            </tr>
          </Table.Head>
          {loading ? (
            <Table.Body>
              <Table.Loading />
            </Table.Body>
          ) : (
            <Table.Body>
              {filteredOpportunities && filteredOpportunities.length > 0 ? (
                <>
                  {filteredOpportunities.map((opportunity) => (
                    <AdminOpportunitiesRow
                      error={error}
                      setError={setError}
                      handleDelete={handleDelete}
                      setSelectedOpportunities={setSelectedOpportunities}
                      selectedOpportunities={selectedOpportunities}
                      {...opportunity}
                      key={opportunity.opportunityId}
                    />
                  ))}
                </>
              ) : (
                <Table.Row>
                  <Table.Data colSpan="7" className="text-center py-20">
                    No opportunities found
                  </Table.Data>
                </Table.Row>
              )}
            </Table.Body>
          )}
        </Table>
      </div>
    </>
  );
};

export default AdminOpportunitiesTable;
