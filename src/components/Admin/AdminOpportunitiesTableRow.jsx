import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Table from "../Table";

const AdminOpportunitiesRow = ({
  title,
  status,
  deadline,
  full_name,
  opportunity_id,
  numberOfApplications,
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
            id={`checkbox-table-search-${opportunity_id}`}
            type="checkbox"
            className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
            onChange={() => handleChange(opportunity_id)}
            checked={selectedOpportunities.includes(opportunity_id)}
          />
          <label htmlFor={`checkbox-table-search-${opportunity_id}`} className="sr-only">
            checkbox
          </label>
        </div>
      </Table.Data>
      <Table.Data className="font-subheading font-bold whitespace-nowrap">
        {title}
      </Table.Data>
      <Table.Data>{status}</Table.Data>
      <Table.Data>{full_name}</Table.Data>
      <Table.Data>{deadline}</Table.Data>
      <Table.Data>{numberOfApplications}</Table.Data>
      <Table.Data>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="ml-auto pl-2 focus:outline-none"
              onClick={() => handleMenuToggle(opportunity_id)}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </Menu.Button>
          </div>
          {openMenuId === opportunity_id && (
            <Menu.Items className="absolute z-50 right-0 w-30 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 w-full text-left`}
                      onClick={() => handleDelete(opportunity_id)}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          )}
        </Menu>
      </Table.Data>
    </Table.Row>
  );
};

export default AdminOpportunitiesRow;
