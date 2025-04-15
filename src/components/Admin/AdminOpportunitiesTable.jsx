"use client";

import { useState } from "react";
import Link from "next/link";

import API from "@/api/api";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Error } from "../Form";

const AdminOpportunitiesTable = ({ opportunities }) => {
  const [error, setError] = useState({});

  const rows = opportunities.map(
    ({
      opportunityId: id,
      title,
      status,
      fullName,
      deadline,
      numberOfApplications,
      applications,
    }) => ({
      id,
      col1: title,
      col2: status,
      col3: fullName,
      col4: deadline,
      col5: applications,
    })
  );

  const columns = [
    {
      field: "col1",
      headerName: "Title",
      width: "300",
      renderCell: (params) => {
        return (
          <Link
            className="hover:underline"
            href={`/creator-platform-frontend/src/app/(platform)/(protected)/dashboard/opportunities/${params.id}`}
          >
            {params.row.col1}
          </Link>
        );
      },
    },
    { field: "col2", headerName: "Status", width: 150 },
    { field: "col3", headerName: "Author", width: 250 },
    { field: "col4", headerName: "Deadline", width: 150, disableExport: true },
    {
      field: "col5",
      headerName: "Applications",
      width: 100,
      valueFormatter: (value) => {
        return JSON.stringify(value);
      },
      renderCell: (params) => {
        return (
          <Link
            className="hover:underline"
            href={`/creator-platform-frontend/src/app/(platform)/(protected)/dashboard/opportunities/${params.id}`}
          >
            {params.value.length}
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      disableExport: true,
      width: 100,
      cellClassName: "!text-center",
      renderCell: (params) => {
        return (
          <button type="button" onClick={() => handleDelete(params.id)}>
            <span className="sr-only">Delete</span>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    setError({});
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        await API.delete(`/opportunities/opportunityid/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        window.location.reload();
      }
    } catch (error) {
      setError({
        message: `Something went wrong when deleting the opportunity`,
      });
      console.error(error);
    }
  };

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
    </div>
  );
};

export default AdminOpportunitiesTable;
