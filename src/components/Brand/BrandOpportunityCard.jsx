import { Suspense, useState } from "react";
import { Menu } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import Modal from "@/components/Modal";
import ApplicationsModal from "@/components/Brand/ApplicationsModal";

import API from "@/api/api";
import EditOpportunityForm from "./EditOpportunityForm";
import SpinnerScreen from "../SpinnerScreen";
import useAuth from "@/hooks/useAuth";

const BrandOpportunityCard = (props) => {
  const { token } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

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
      <Card className="inline-block space-y-4 w-full max-w-sm relative">
        <div className="flex gap-x-3 content-start items-center justify-between">
          <div className="flex content-start items-start md:items-center">
            <p className="mr-3 text-queen-black capitalize">{title}</p>
            <Tag className="inline-block">{statusLabel}</Tag>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="ml-auto pl-2 focus:outline-none">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Menu.Button>
            <Menu.Items className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-1 w-30 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex rounded-md items-center w-full px-5 py-2 text-sm`}
                      onClick={() => completeOpportunity(opportunityId)}
                    >
                      Complete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>

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
          onClick={() => setIsApplicationsOpen(true)}
        >
          View Applications
        </Button>
        <Suspense fallback={<SpinnerScreen />}>
          {isApplicationsOpen && (
            <ApplicationsModal
              isApplicationsOpen={isApplicationsOpen}
              setIsApplicationsOpen={setIsApplicationsOpen}
              opportunityId={opportunityId}
              opportunityTitle={title}
            />
          )}
        </Suspense>
      </Card>
      <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditOpportunityForm {...props} />
      </Modal>
    </>
  );
};

export default BrandOpportunityCard;
