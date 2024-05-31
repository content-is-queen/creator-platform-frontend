import { useState } from "react";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Table from "../Table";
import SubMenu from "@/components/SubMenu";
import ProfileIcon from "@/components/ProfileIcon";

const AdminUserTableRow = ({
  uid,
  imageUrl,
  first_name,
  last_name,
  email,
  role,
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
    <Table.Row>
      <Table.Data className="pl-6">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${uid}`}
            type="checkbox"
            checked={selectedUsers.includes(uid)}
            className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
            onChange={() => handleChange(uid)}
          />
          <label htmlFor={`checkbox-table-search-${uid}`} className="sr-only">
            checkbox
          </label>
        </div>
      </Table.Data>
      <Table.Data className="flex items-center font-subheading font-bold whitespace-nowrap">
        <ProfileIcon imageUrl={imageUrl} />
        <div className="ps-6">
          <div className="font-subheading">{first_name + " " + last_name}</div>
        </div>
      </Table.Data>

      <Table.Data>
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${isActivated ? "bg-green-500" : "bg-red-500"} me-2`}
          ></div>{" "}
          {isActivated ? "Activated" : "Deactivated"}
        </div>
      </Table.Data>
      <Table.Data>{email}</Table.Data>
      <Table.Data className="px-6 py-3 capitalize">{role}</Table.Data>
      <Table.Data className="px-6 py-3 relative">
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
      </Table.Data>
    </Table.Row>
  );
};

export default AdminUserTableRow;
