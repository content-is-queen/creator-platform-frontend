"use client";

import { useState } from "react";
import Link from "next/link";
import API from "@/api/api";

import { Error } from "@/components/Form";
import CreateUserForm from "./CreateUserForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "@/components/ProfileIcon";

const AdminUsersTable = ({ users }) => {
  const [error, setError] = useState({});

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        await API.delete(`/admin/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        window.location.reload();
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
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
    ({
      uid: id,
      firstName,
      lastName,
      disabled,
      email,
      role,
      profilePhoto,
      subscribed,
    }) => ({
      id,
      user: `${firstName} ${lastName}`,
      disabled: disabled,
      email,
      role,
      subscribed,
      profilePhoto,
    })
  );

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return (
          <span className="inline-flex gap-2.5 items-center">
            <ProfileIcon profilePhoto={params.row.profilePhoto} />
            <Link className="hover:underline" href={`/profile/${params.id}`}>
              {params.row.user}
            </Link>
          </span>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      cellClassName: "capitalize",
      valueGetter: (value) => {
        return value.replace("_", " ");
      },
    },
    {
      field: "disabled",
      headerName: "Status",
      width: 150,
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
    {
      field: "subscribed",
      headerName: "Subscribed",
      width: 150,
      cellClassName: "capitalize",
    },
    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <button
              onClick={() =>
                handleActivation({
                  id: params.id,
                  activated: !params.row.disabled,
                })
              }
            >
              {params.row.disabled ? (
                <>
                  <span className="sr-only">Activate</span>
                  <FontAwesomeIcon icon={faCheck} />
                </>
              ) : (
                <>
                  <span className="sr-only">Deactivate</span>
                  <FontAwesomeIcon icon={faBan} />
                </>
              )}
            </button>

            <button onClick={() => handleDelete(params.id)}>
              <span className="sr-only">Delete</span>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="py-8 space-y-6">
      {error?.message && <Error>{error?.message}</Error>}

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          className="bg-queen-white"
          slots={{ toolbar: GridToolbar }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default AdminUsersTable;
