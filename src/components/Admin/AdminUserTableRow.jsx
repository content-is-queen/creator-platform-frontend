import { Menu } from "@headlessui/react";
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
            <Menu.Button className="ml-auto pl-2 focus:outline-none">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Menu.Button>
          </div>
          <Menu.Items className="absolute z-50 right-0 w-31 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gray-100 text-queen-black"
                        : "text-queen-black/80"
                    } px-4 py-2 text-left block`}
                    onClick={() =>
                      handleActivation({
                        id: uid,
                        activated: !disabled,
                      })
                    }
                  >
                    {disabled ? "Activate" : "Deactivate"}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-gray-100 text-queen-black"
                        : "text-queen-black/80"
                    } px-4 py-2 text-left block w-full`}
                    onClick={() => handleDelete(uid)}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </Table.Data>
    </Table.Row>
  );
};

export default AdminUserTableRow;
