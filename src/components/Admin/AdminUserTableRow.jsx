import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Table from "../Table";
import ProfileIcon from "@/components/ProfileIcon";
import Link from "next/link";

const AdminUserTableRow = ({
  uid,
  profilePhoto,
  firstName,
  lastName,
  email,
  role,
  disabled,
  handleActivation,
  handleDelete,
}) => {
  return (
    <Table.Row>
      <Table.Data className="flex items-center font-subheading font-bold whitespace-nowrap">
        <ProfileIcon profilePhoto={profilePhoto} />
        <Link
          className="ps-4 hover:underline"
          target="_blank"
          href={`/profile/${uid}`}
        >
          <div className="font-subheading">{firstName + " " + lastName}</div>
        </Link>
      </Table.Data>

      <Table.Data>
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${disabled ? "bg-red-500" : "bg-green-500"} me-2`}
          ></div>{" "}
          {disabled ? "Disabled" : "Active"}
        </div>
      </Table.Data>
      <Table.Data>{email}</Table.Data>
      <Table.Data className="px-6 py-3 capitalize">
        {role.replace("_", " ")}
      </Table.Data>
      <Table.Data className="px-6 py-3 relative">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="ml-auto pl-2 focus-visible:outline-none">
              <FontAwesomeIcon icon={faEllipsisV} />
            </MenuButton>
          </div>
          <MenuItems
            className="absolute transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-t-md rounded-b-md shadow-lg focus-visible:outline-none"
            transition
          >
            <div className="py-1">
              <MenuItem>
                <button
                  className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 px-4 py-2 text-left block w-full"
                  onClick={() =>
                    handleActivation({
                      id: uid,
                      activated: !disabled,
                    })
                  }
                >
                  {disabled ? "Activate" : "Deactivate"}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 px-4 py-2 text-left block w-full"
                  onClick={() => handleDelete(uid)}
                >
                  Delete
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </Table.Data>
    </Table.Row>
  );
};

export default AdminUserTableRow;
