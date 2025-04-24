import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useSubscribed from "@/hooks/useSubscribed";
import Button from "@/components/Button";

const ApplicationTable = ({ applications }) => {
  const { subscribed, loading } = useSubscribed();

  const CustomToolbar = () => {
    if (loading) return null;

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />

        {subscribed ? (
          <GridToolbarExport />
        ) : (
          <Button variant="blue" size="sm" href="/plus">
            Subscribe to export
          </Button>
        )}
      </GridToolbarContainer>
    );
  };

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
      slots={{ toolbar: CustomToolbar }}
      columns={columns}
      rows={rows}
      componentsProps={{
        columnHeaders: { className: "text-queen-blue bg-red-500" },
      }}
    />
  );
};

export default ApplicationTable;
