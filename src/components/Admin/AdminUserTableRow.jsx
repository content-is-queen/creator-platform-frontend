import { useState } from "react";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SubMenu from "@/components/SubMenu";
import ProfileIcon from "@/components/ProfileIcon";

const AdminUserTableRow = ({
  uid,
  imageUrl,
  first_name,
  last_name,
  email,
  isActivated,
  selectedUsers,
  setSelectedUsers,
  handleActivation,
  handleDelete,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleChange = (uid) => {
    selectedUsers.includes(uid)
      ? setSelectedUsers((prev) => prev.filter((i) => !i.includes(uid)))
      : setSelectedUsers((prev) => [...prev, uid]);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <tr className="bg-queen-white hover:bg-queen-gray" key={uid}>
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${uid}`}
            type="checkbox"
            checked={selectedUsers.includes(uid)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            onChange={() => handleChange(uid)}
          />
          <label htmlFor={`checkbox-table-search-${uid}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
      >
        <ProfileIcon imageUrl={imageUrl} />
        <div className="ps-3">
          <div className="text-base font-semibold">
            {first_name + " " + last_name}
          </div>
        </div>
      </th>

      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${isActivated ? "bg-green-500" : "bg-red-500"} me-2`}
          ></div>{" "}
          {isActivated ? "Activated" : "Deactivated"}
        </div>
      </td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4 relative">
        <button
          type="button"
          className="ml-auto pl-2"
          onClick={() => handleMenuToggle(uid)}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {openMenuId === uid && (
          <SubMenu>
            <SubMenu.Item>
              <button
                type="button"
                onClick={() =>
                  handleActivation({
                    id: uid,
                    activated: isActivated,
                  })
                }
                className="px-4 py-1 w-full text-left inline-block"
              >
                {!isActivated ? "Activate" : "Deactivate"}
              </button>
            </SubMenu.Item>
            <SubMenu.Item>
              <button
                type="button"
                onClick={() => handleDelete(uid)}
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

export default AdminUserTableRow;
