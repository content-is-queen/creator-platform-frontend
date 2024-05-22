"use client";

import { useState, useEffect } from "react";

import useToken from "@/hooks/useToken";
import API from "@/api/api";

import Search from "@/components/Search";
import AdminOpportunitiesRow from "./AdminOpportunitiesTableRow";
import Table from "../Table";
import { Error } from "../Form";

const TableBody = (props) => {
  const { data } = props;
  if (data && data.length > 0) {
    return data.map((opportunity) => (
      <AdminOpportunitiesRow
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
  const [loading, setLoading] = useState(true);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [errors, setError] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  const { token } = useToken();

  useEffect(() => {
    setLoading(false);
  }, []);

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
        <Table>
          <Table.Head>
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
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
            </tr>
          </Table.Head>
          {loading ? (
            <Table.Loading />
          ) : (
            <Table.Body>
              {filteredOpportunities && filteredOpportunities.length > 0 ? (
                <>
                  {filteredOpportunities.map((opportunity) => (
                    <AdminOpportunitiesRow
                      errors={errors}
                      setError={setError}
                      handleDelete={handleDelete}
                      setSelectedOpportunities={setSelectedOpportunities}
                      selectedOpportunities={selectedOpportunities}
                      {...opportunity}
                      key={opportunity.opportunity_id}
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
        {errors?.message && <Error>{errors?.message}</Error>}
      </div>
    </>
  );
};

export default AdminOpportunitiesTable;
