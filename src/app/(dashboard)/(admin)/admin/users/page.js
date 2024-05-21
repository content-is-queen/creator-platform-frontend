"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

import Loading from "@/app/(auth)/loading";
import AdminSearch from "@/components/Admin/AdminSearch";
import Container from "@/components/Container";
import UsersList from "@/components/UsersList";
import { Error } from "@/components/Form";

const Users = () => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [filteredUsersList, setFilteredUsersList] = useState([]);

  const { token } = useToken();

  const getUsers = async () => {
    setError({});

    try {
      setLoading(true);
      const response = await API.get(`/admin/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFilteredUsersList(response.data);
    } catch (error) {
      setError({ message: "Something went wrong getting all users" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    token && getUsers();
  }, [token]);

  const searchQuery = (query) => {
    const filtered = filteredUsersList.filter(
      (user) =>
        user?.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user?.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsersList(filtered);
  };

  const deleteSelectedUser = async (id) => {
    setError({});
    try {
      await API.delete(`/admin/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      getUsers();
    } catch (error) {
      setError({ message: "There was an error deleting the user" });
      console.error(error);
    }
  };
  const handleUserActivation = async (data) => {
    setError({});
    try {
      if (data?.activated === false) {
        await API.put(`/admin/activate/${data?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        getUsers();
      }
      if (data?.activated === true) {
        await API.put(`/admin/deactivate/${data?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        getUsers();
      }
    } catch (error) {
      console.error(error);
      setError({ message: "There was an error deactivating the user" });
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="min-w-[80%] ">
          {errors?.message && <Error>{errors.message}</Error>}
          <AdminSearch searchQuery={searchQuery} />
          {loading && <Loading />}
          {!loading && !errors && filteredUsersList?.length === 0 && (
            <p>No users found</p>
          )}
          {!loading && filteredUsersList?.length > 0 && (
            <UsersList
              list={filteredUsersList}
              selectedId={deleteSelectedUser}
              activate={handleUserActivation}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Users;
