import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import SubMenu from "../SubMenu";
import Table from "../Table";

const AdminOpportunitiesRow = ({
  title,
  status,
  deadline,
  userName, // TODO: change to full_name
  opportunity_id,
  numberOfApplications,
  setError,
  selectedOpportunities,
  setSelectedOpportunities,
  handleDelete,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleChange = (id) => {
    selectedOpportunities.includes(id)
      ? setSelectedOpportunities((prev) => prev.filter((i) => !i.includes(id)))
      : setSelectedOpportunities((prev) => [...prev, id]);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <Table.Row>
      <Table.Data>
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
            onChange={() => handleChange(opportunity_id)}
            checked={selectedOpportunities.includes(opportunity_id)}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </Table.Data>
      <Table.Data className="font-subheading font-bold whitespace-nowrap">
        {title}
      </Table.Data>
      <Table.Data>{status}</Table.Data>
      <Table.Data>{userName}</Table.Data>
      <Table.Data>{deadline}</Table.Data>
      <Table.Data>{numberOfApplications}</Table.Data>
      <Table.Data>
        <button
          type="button"
          className="ml-auto pl-2"
          onClick={() => handleMenuToggle(opportunity_id)}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {openMenuId === opportunity_id && (
          <SubMenu>
            <SubMenu.Item>
              <button
                type="button"
                onClick={() => handleDelete(opportunity_id)}
                className="px-4 py-1 w-full text-left inline-block"
              >
                Delete
              </button>
            </SubMenu.Item>
          </SubMenu>
        )}
      </Table.Data>
    </Table.Row>
  );
};

export default AdminOpportunitiesRow;
