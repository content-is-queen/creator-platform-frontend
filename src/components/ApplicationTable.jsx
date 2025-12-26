import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import useSubscribed from "@/hooks/useSubscribed";
import Button from "@/components/Button";
import {
  faCircleCheck,
  faCircleXmark,
  faClock,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "@/api/api";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

const StatusIcon = ({ status }) => {
  const icon = {
    accepted: { icon: faCircleCheck, className: "text-green-500/60" },
    rejected: { icon: faCircleXmark, className: "text-red-500/60" },
    pending: { icon: faClock, className: "text-queen-black/60" },
  };

  return <FontAwesomeIcon title={status} {...icon[status]} />;
};

const ApplicationTable = ({ applications }) => {
  const { subscribed, loading } = useSubscribed();
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const user = useUser();

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

  const rejectApplication = async ({
    applicationId,
    creatorId,
    opportunityTitle,
  }) => {
    setRejectLoading(true);
    try {
      const response = await API.patch(
        `/applications/${applicationId}`,
        {
          status: "rejected",
          authorId: user.uid,
          creatorId,
          opportunityTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when rejecting the application"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRejectLoading(false);
    }
  };
  const acceptApplication = async ({
    creatorId,
    opportunityTitle,
    opportunityId,
    proposal,
    applicationId,
  }) => {
    setAcceptLoading(true);
    try {
      const response = await API.patch(
        `/applications/${applicationId}`,
        {
          status: "accepted",
          authorId: user.uid,
          creatorId,
          opportunityTitle,
          opportunityId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      setMessage({ status: "accepted", room: response.data.message.roomId });

      const roomRef = await getDoc(
        doc(db, "rooms", response.data.message.roomId)
      );

      const messageData = {
        uid: creatorId,
        createdAt: serverTimestamp(),
        message: proposal,
      };

      await addDoc(
        collection(db, "rooms", response.data.message.roomId, "messages"),
        messageData
      );

      await updateDoc(roomRef, {
        lastMessage: proposal,
        senderId: user.uid,
        timeSent: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
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
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: ({ value }) => {
        return <StatusIcon status={value} />;
      },
      valueFormatter: ({ value }) => value,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        if (params.row.status === "pending") {
          return (
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => rejectApplication(params.row)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button
                type="button"
                onClick={() => acceptApplication(params.row)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          );
        }
      },
    },
  ];

  return (
    <DataGrid
      slots={{ toolbar: CustomToolbar }}
      columns={columns}
      rows={rows}
      style={{ height: 500 }}
      className="bg-white"
      componentsProps={{
        columnHeaders: { className: "text-queen-blue bg-red-500" },
      }}
    />
  );
};

export default ApplicationTable;
