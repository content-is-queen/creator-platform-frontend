import { useState } from "react";
import SubMenu from "./SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const OpportunityRow = ({
  title,
  applications,
  userName,
  status,
  target,
  deadline,
  opportunity_id,
  setIdToDelete,
  numberOfApplications,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const subMenuToggle = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteOpportunity = (data) => {
    setIdToDelete(data);
  };

  return (
    <tr className="bg-white border-b hover:bg-queen-gray">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {title}
      </th>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4">{userName}</td>
      <td className="px-6 py-4">{deadline}</td>
      <td className="px-6 py-4">{numberOfApplications}</td>
      <td className="px-6 py-4 relative">
        <button
          type="button"
          className="ml-auto pl-2"
          onClick={() => subMenuToggle(opportunity_id)}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {openMenuId === opportunity_id && (
          <SubMenu>
            <SubMenu.Item>
              <button
                type="button"
                onClick={() => handleDeleteOpportunity(opportunity_id)}
                className="px-4 py-1 w-full text-left inline-block"
              >
                Delete
              </button>
            </SubMenu.Item>
          </SubMenu>
        )}
      </td>
    </tr>
  );
};

export default OpportunityRow;
