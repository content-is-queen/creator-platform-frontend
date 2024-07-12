import { Menu } from "@headlessui/react";
import { Suspense, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import ApplicationsModal from "./ApplicationsModal";
import SpinnerScreen from "../SpinnerScreen";
import ViewOpportunityModal from "./ViewOpportunityModal";

const BrandOpportunityCard = (props) => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [viewOpportunity, setViewOpportunity] = useState(false);
  const { token } = useAuth();

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

  const statusLabel = status.replace("_", " ");

  const deleteOpportunity = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        await API.delete(`/opportunities/opportunityid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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
    <>
      {viewOpportunity && (
        <ViewOpportunityModal
          isOpen={viewOpportunity}
          setIsOpen={setViewOpportunity}
          {...props}
        />
      )}
      <Card className="inline-block space-y-4 w-full max-w-sm relative">
        <div className="flex gap-x-3 content-start items-start justify-between">
          <p className="mr-3 text-queen-black capitalize leading-tight">
            {title}
          </p>

          <Menu as="div" className="relative">
            <Menu.Button className="ml-auto px-2 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-queen-blue">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Menu.Button>
            <Menu.Items className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-30 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus-visible:outline-none z-50">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-gray-100 text-queen-black/80"
                          : "text-queen-black"
                      } group flex rounded-md items-center w-full px-5 py-2 text-sm`}
                      onClick={() => deleteOpportunity(opportunityId)}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-gray-100 text-queen-black/80"
                          : "text-queen-black"
                      } group flex rounded-md items-center w-full px-5 py-2 text-sm`}
                      onClick={() => completeOpportunity(opportunityId)}
                    >
                      Complete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-gray-100 text-queen-black/80"
                          : "text-queen-black"
                      } group flex rounded-md items-center w-full px-5 py-2 text-sm`}
                      onClick={() => setViewOpportunity(true)}
                    >
                      View
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
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
          type="button"
          as="button"
          onClick={() => setApplicationsOpen(true)}
        >
          View Applications
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
    </>
  );
};

export default BrandOpportunityCard;
