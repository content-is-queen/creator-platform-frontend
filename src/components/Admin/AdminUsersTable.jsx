"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import Search from "@/components/Search";
import AdminUserTableRow from "./AdminUserTableRow";
import { Error, Success } from "@/components/Form";
import Table from "@/components/Table";
import CreateUserForm from "./CreateUserForm";
import { filter } from "lodash";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminUsersTable = ({ users }) => {
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  useEffect(() => {
    setFilteredUsers(users);
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        const response = await API.delete(`/admin/delete/${id}`, {
          headers: {
            Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        const deletedUser = response.data.data;
        setSuccess({ message: response.data.message });
        setFilteredUsers((prev) => prev.filter((i) => i.email !== email));
      }
    } catch (error) {
      setError({ message: error.response.data.message });
      console.error(error);
    }
  };

  const handleActivation = async ({ activated, id }) => {
    setError({});
    try {
      if (activated === false) {
        await API.put(
          `/admin/activate/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );

        window.location.reload();
      }
      if (activated === true) {
        await API.put(
          `/admin/deactivate/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Authorization: Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );

        window.location.reload();
      }
    } catch (error) {
      setError({ message: "There was an error updating this users status" });
    }
  };

  const rows = users.map(
    ({ uid: id, firstName, lastName, disabled, email, role }) => ({
      id,
      user: `${firstName} ${lastName}`,
      disabled: disabled,
      email,
      role,
    })
  );

  const columns = [
    { field: "user", headerName: "User", width: 150 },
    {
      field: "disabled",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full ${params.row.disabled ? "bg-red-500" : "bg-green-500"} me-2`}
            ></div>{" "}
            {params.row.disabled ? "Disabled" : "Active"}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", width: 100, type: "number" },
    {
      field: "manage",
      headerName: "",
      disableExport: true,
      width: 100,
      cellClassName: "!text-center",
      renderCell: (params) => {
        return (
          <button type="button" onClick={() => handleDelete(params.id)}>
            <span className="sr-only">Change me</span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="py-8 space-y-6">
      {error?.message && <Error>{error?.message}</Error>}
      {success?.message && <Success>{success?.message}</Success>}
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
      <div className="fixed bottom-8 right-8 z-50">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default AdminUsersTable;
