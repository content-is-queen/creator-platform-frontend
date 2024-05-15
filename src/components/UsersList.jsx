import React, { useState } from "react";
import BrandOpportunityCard from "./Brand/BrandOpportunityCard";
import SubMenu from "./SubMenu";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const UsersList = ({ list, selectedId, activate }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState({});
  const [errors, setError] = useState({});
  const { token } = useToken();

  const handleCheckboxChange = (uid) => {
    setSelectedUser(uid);

    setMenuOpen((prev) => ({ ...prev, [uid]: false }));
  };

  const subMenuToggle = (uid) => {
    setMenuOpen((prev) => ({ ...prev, [uid]: !prev[uid] }));
  };

  const deleteUser = async (user) => {
    selectedId(user);
  };

  const ActivateUser = async (id) => {
    activate(id);
  };

  return (
    <div className="overflow-x-auto max-h-[70vh]">
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500 bg-gray-900">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item) => {
              const uid = item.uid;
              return (
                <tr className="bg-queen-white hover:bg-queen-gray" key={uid}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${uid}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={selectedUser === uid}
                        onChange={() => handleCheckboxChange(uid)}
                      />
                      <label
                        htmlFor={`checkbox-table-search-${uid}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGV8ZW58MHx8MHx8fDA%3D"
                      }
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {item.first_name + " " + item.last_name}
                      </div>
                    </div>
                  </th>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${item?.isActivated ? "bg-green-500" : "bg-red-500"} me-2`}
                      ></div>{" "}
                      {item?.isActivated ? "Activated" : "Deactivated"}
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.email}</td>
                  <td className="px-6 py-4 relative">
                    <button
                      type="button"
                      className="ml-auto pl-2"
                      onClick={() => subMenuToggle(uid)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    {menuOpen[uid] && (
                      <SubMenu>
                        <SubMenu.Item>
                          <button
                            type="button"
                            onClick={() =>
                              ActivateUser({
                                id: item?.uid,
                                activated: item?.isActivated,
                              })
                            }
                            className="px-4 py-1 w-full text-left inline-block"
                          >
                            {!item?.isActivated ? "Activate" : "Deactivate"}
                          </button>
                        </SubMenu.Item>
                        <SubMenu.Item>
                          <button
                            type="button"
                            onClick={() => deleteUser(item?.uid)}
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
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
