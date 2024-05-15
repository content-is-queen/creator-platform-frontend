"use client";

import API from "@/api/api";
import Loading from "@/app/(auth)/loading";
import AdminSearch from "@/components/AdminSearch";
import Container from "@/components/Container";
import UsersList from "@/components/UsersList";
import useToken from "@/hooks/useToken";
import { useEffect, useState } from "react";

const Users = () => {
  const { token } = useToken();
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);

  const adminGetAllTheUsers = async () => {
    setError({});
    console.log("token", token);
    try {
      setLoading(true);
      const response = await API(`/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setUsersList(response);
      setFilteredUsersList(response);
    } catch (error) {
      console.error("Sign up error:", error);
    }

    if (response.status > 200) {
      setError({
        message: "Something went wrong. User sign up failed.",
      });
      return;
    }
  };
  console.log("Useeeeeee", usersList);

  useEffect(() => {
    setError({});
    if (token) {
      adminGetAllTheUsers();
    }
  }, [token]);

  const searchQuery = (query) => {
    const filtered = usersList.filter(
      (user) =>
        user?.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user?.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsersList(filtered);
  };

  const deleteSelectedUser = async (id) => {
    setError({});
    try {
      const response = await API(`/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status > 200) {
        setError({
          message:
            response.message || "Something went wrong. User sign up failed.",
        });
        return;
      }
      if (response.status === 200) {
        adminGetAllTheUsers();
      }
      console.log(response, "direct response..........");
    } catch (error) {
      const { message } = error.response;
      toast.error(message || "Try again");
    }
  };
  const handleUserActivation = async (data) => {
    console.log(data, "data");

    setError({});
    try {
      if (data?.activated === false) {
        const response = await API(`/admin/activate/${data?.id}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.status > 200) {
          setError({
            message:
              response?.message || "Something went wrong. User sign up failed.",
          });
          return;
        }
        if (response?.status === 200) {
          adminGetAllTheUsers();
        }
      }
      if (data?.activated === true) {
        const response = await API(`/admin/deactivate/${data?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.status > 200) {
          setError({
            message:
              response?.message || "Something went wrong. User sign up failed.",
          });
          return;
        }
        if (response?.status === 200) {
          adminGetAllTheUsers();
        }
      }

      console.log(response, "direct response..........");
    } catch (error) {
      // const { message } = erresponse;
      // toast.error(message || "Try again");
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="min-w-[80%] ">
          {errors?.message && (
            <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
              <p>{errors?.message}</p>
            </div>
          )}
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
