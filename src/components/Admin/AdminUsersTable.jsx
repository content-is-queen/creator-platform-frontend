"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import useToken from "@/hooks/useToken";

import Search from "@/components/Search";
import AdminUserTableRow from "./AdminUserTableRow";
import { Error } from "@/components/Form";
import Table from "@/components/Table";

const AdminUsersTable = ({ users }) => {
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [errors, setError] = useState({});

  const { token } = useToken();

  useEffect(() => {
    setLoading(false);
  }, []);

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

  const deleteSelectedUsers = async () => {
    setError({});
    try {
      await Promise.all(
        selectedUsers.map((id) =>
          API.delete(`/admin/delete/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      window.location.reload();
    } catch (error) {
      setError({ message: "There was an error deleting the users" });
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

      {selectedUsers.length > 0 && (
        <button
          onClick={deleteSelectedUsers}
          className="px-4 py-1 w-full text-left border border-gray-500 rounded-md text-base"
        >
          Delete Selected
        </button>
      )}

      <div className="my-12 space-y-6">
        <Table>
          <Table.Head>
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={checkAll}
                    onClick={() => handleCheckAll()}
                    className="p-1 w-4 h-4 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue"
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
                Role
              </th>
            </tr>
          </Table.Head>
          {loading ? (
            <Table.Loading />
          ) : (
            <Table.Body>
              {filteredUsers && filteredUsers.length > 0 ? (
                <>
                  {filteredUsers.map((user) => (
                    <AdminUserTableRow
                      errors={errors}
                      setError={setError}
                      selectedUsers={selectedUsers}
                      setSelectedUsers={setSelectedUsers}
                      handleActivation={handleActivation}
                      handleDelete={handleDelete}
                      {...user}
                      key={user.uid}
                    />
                  ))}
                </>
              ) : (
                <Table.Row>
                  <Table.Data colSpan="7" className="text-center py-20">
                    No users found
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

export default AdminUsersTable;
