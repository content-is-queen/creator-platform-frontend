import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { Suspense, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import API from "@/api/api";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import ApplicationsModal from "./ApplicationsModal";
import SpinnerScreen from "../SpinnerScreen";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

const BrandOpportunityCard = (props) => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);

  const {
    compensation,
    deadline,
    status,
    title,
    opportunityId,
    salary,
    endDate,
    budget,
    type,
  } = props;

  const { data: applications } = useQuery({
    queryKey: ["application", opportunityId],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("opportunityId", "==", opportunityId),
        where("status", "==", "pending")
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    enabled: !!opportunityId,
  });

  const statusLabel = status.replace("_", " ");

  const deleteOpportunity = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        await API.delete(`/opportunities/opportunityid/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });

        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const completeOpportunity = async (id) => {
    try {
      if (confirm("Mark opportunity as completed?")) {
        await API.put(
          `/opportunities/opportunityid/${id}`,
          { status: "complete", type },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );

        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="inline-block space-y-4 w-full max-w-sm relative">
      <div className="flex gap-x-3 content-start items-start justify-between">
        <Link
          className="mr-3 text-queen-black leading-tight hover:underline"
          href={`/applications/${opportunityId}`}
        >
          {title}
        </Link>

        <Menu as="div" className="relative">
          <MenuButton className="ml-auto px-2 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-queen-blue">
            <FontAwesomeIcon icon={faEllipsisV} />
          </MenuButton>
          <MenuItems className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-30 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus-visible:outline-none z-50">
            <div className="px-1 py-1">
              <MenuItem>
                <button
                  className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 text-queen-black group flex rounded-b-md items-center w-full px-5 py-2 text-sm"
                  onClick={() => deleteOpportunity(opportunityId)}
                >
                  Delete
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="data-[active]:bg-gray-100 data-[active]:text-queen-black/80 text-queen-black group flex rounded-b-md items-center w-full px-5 py-2 text-sm"
                  onClick={() => completeOpportunity(opportunityId)}
                >
                  Complete
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <Tag className="inline-block !mt-2">{statusLabel}</Tag>

      <div className="flex gap-6 items-center">
        <div className="flex flex-col">
          <Text as="span" color="muted" size="xs">
            Compensation
          </Text>
          <Text as="span" size="sm">
            {compensation || salary || budget || "n/a"}
          </Text>
        </div>

        <div className="flex flex-col">
          <Text as="span" color="muted" size="xs">
            Deadline
          </Text>
          <Text as="span" size="sm">
            {deadline || endDate}
          </Text>
        </div>
      </div>

      <Button
        variant="white"
        href={`/applications/${opportunityId}`}
        className="relative"
      >
        View Applications{" "}
        {applications?.length > 0 && (
          <span className="bg-queen-black/60 font-bold h-5 w-5 rounded-full text-white absolute top-0 -right-2 flex items-center justify-center">
            <span>{applications.length}</span>
          </span>
        )}
      </Button>

      <Suspense fallback={<SpinnerScreen />}>
        {applicationsOpen && (
          <ApplicationsModal
            open={applicationsOpen}
            setOpen={setApplicationsOpen}
            opportunityId={opportunityId}
            opportunityTitle={title}
          />
        )}
      </Suspense>
    </Card>
  );
};

export default BrandOpportunityCard;
