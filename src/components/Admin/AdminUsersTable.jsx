"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import useAuth from "@/hooks/useAuth";

import Search from "@/components/Search";
import AdminUserTableRow from "./AdminUserTableRow";
import { Error } from "@/components/Form";
import SubMenu from "../SubMenu";
import Table from "@/components/Table";
import Kebab from "../Kebab";

const AdminUsersTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});

  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
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
        filter={{ keys: ["firstName", "lastName"], tag: "role" }}
      />

      <div className="my-12 space-y-6">
        {error?.message && <Error>{error?.message}</Error>}

        <Table>
          <Table.Head>
            <tr>
              <th scope="col" className="px-6 py-3"></th>
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
              <th scope="col" className="px-6 py-3">
                {selectedUsers.length > 0 && (
                  <>
                    <Kebab onClick={() => setIsOpen(!isOpen)} />

                    {isOpen && (
                      <SubMenu>
                        <SubMenu.Item>
                          <button
                            type="button"
                            onClick={deleteSelectedUsers}
                            className="px-4 py-1 w-full text-left inline-block"
                          >
                            Delete
                          </button>
                        </SubMenu.Item>
                      </SubMenu>
                    )}
                  </>
                )}
              </th>
            </tr>
          </Table.Head>
          {loading ? (
            <Table.Body>
              <Table.Loading />
            </Table.Body>
          ) : (
            <Table.Body>
              {filteredUsers && filteredUsers.length > 0 ? (
                <>
                  {filteredUsers.map((user) => (
                    <AdminUserTableRow
                      error={error}
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
      </div>
    </>
  );
};

export default AdminUsersTable;
