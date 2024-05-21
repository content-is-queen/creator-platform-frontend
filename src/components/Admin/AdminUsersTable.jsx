"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import useToken from "@/hooks/useToken";

import Search from "@/components/Search";
import AdminUserTableRow from "./AdminUserTableRow";
import { Error } from "../Form";

const TableBody = (props) => {
  const { data } = props;
  if (data && data.length > 0) {
    return data.map((user) => (
      <AdminUserTableRow {...props} {...user} key={user.uid} />
    ));
  }

  return (
    <tr>
      <td colSpan="7" className="text-center">
        No users found
      </td>
    </tr>
  );
};

const AdminUsersTable = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [errors, setError] = useState({});

  const token = useToken();

  useEffect(() => {}, [filteredUsers]);

  const handleDelete = async (id) => {
    setError({});
    try {
      await API.delete(`/admin/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      setError({ message: "There was an error deleting the user" });
      console.error(error);
    }
  };

  const handleCheckAll = () => {
    const deselect = selectedUsers.length === users.length;

    deselect
      ? setSelectedUsers(() => {
          setCheckAll(false);
          return [];
        })
      : setSelectedUsers(
          users.map((user) => {
            setCheckAll(true);
            return user.uid;
          })
        );
  };

  const handleActivation = async ({ activated, id }) => {
    setError({});
    try {
      if (activated === false) {
        await API.put(`/admin/activate/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.reload();
      }
      if (activated === true) {
        await API.put(`/admin/deactivate/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setError({ message: "There was an error updating this users status" });
    }
  };

  return (
    <>
      <Search
        data={users}
        filteredData={filteredUsers}
        setFilteredData={setFilteredUsers}
        filter={{ keys: ["first_name", "last_name"], tag: "role" }}
      />

      <div className="my-12 space-y-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      checked={checkAll}
                      onClick={() => handleCheckAll()}
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
              <TableBody
                data={filteredUsers}
                errors={errors}
                setError={setError}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                handleActivation={handleActivation}
                handleDelete={handleDelete}
              />
            </tbody>
          </table>
        </div>
        {errors?.message && <Error>{errors?.message}</Error>}
      </div>
    </>
  );
};

export default AdminUsersTable;
