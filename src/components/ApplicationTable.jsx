import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ApplicationTable = ({ applications }) => {
  console.log(applications);
  const rows = applications.map(
    ({ firstName = "n/a", lastName = "n/a", interests, ...rest }, index) => ({
      ...rest,
      id: firstName[0] + lastName[0] + index,
      name: firstName + " " + lastName,
      interests: interests?.length > 0 && interests.join(", "),
    })
  );
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", minWidth: 200 },
    { field: "interests", headerName: "Interests", minWidth: 400 },
    { field: "goals", headerName: "Goals", minWidth: 250 },
    { field: "bio", minWidth: 200, headerName: "Bio" },
    { field: "proposal", minWidth: 300, headerName: "Proposal" },
  ];
  return (
    <DataGrid
      slots={{ toolbar: GridToolbar }}
      className="bg-white"
      columns={columns}
      rows={rows}
    />
  );
};

export default ApplicationTable;
