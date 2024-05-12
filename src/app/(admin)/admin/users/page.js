"use client";

import API from "@/api/api";
import Loading from "@/app/(auth)/loading";
import AdminSearch from "@/components/AdminSearch";
import Container from "@/components/Container";
import UsersList from "@/components/UsersList";
import useToken from "@/hooks/useToken";
import { getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";

const Users = () => {
  const { token } = useToken();
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);


  const adminGetAllTheUsers=async()=>{
    setError({});
    console.log("token",token);
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

      // if (response.status > 200) {
      //   setError({
      //     message: "Something went wrong. User sign up failed.",
      //   });
      //   return;
      // }
  }
  console.log("Useeeeeee", usersList);

  useEffect(() => {
    setError({});
    if(token){
      console.log("Yes there is a token");
      adminGetAllTheUsers();
    }
  }, [token]);

  const searchQuery = (query) => {
    console.log("just query", query);
    const filtered = usersList.filter(
      (user) =>
        user?.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user?.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsersList(filtered);
  };
  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="min-w-[80%] ">
          <AdminSearch searchQuery={searchQuery} />
          {loading && <Loading />}
          {!loading && filteredUsersList.length === 0 && <p>No users found</p>}
          {!loading && filteredUsersList.length > 0 && (
            <UsersList list={filteredUsersList} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Users;
