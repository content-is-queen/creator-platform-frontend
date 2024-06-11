import { Suspense, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import Modal from "@/components/Modal";
import { Menu } from "@headlessui/react";
import API from "@/api/api";
import EditOpportunityForm from "./EditOpportunityForm";
import SpinnerScreen from "../SpinnerScreen";
import useToken from "@/hooks/useToken";

const BrandOpportunityCard = (props) => {
  const token = useToken();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  const {
    compensation,
    deadline,
    status,
    title,
    opportunity_id,
    salary,
    end_date,
    budget,
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

  return (
    <>
      <Card className="inline-block space-y-4 w-full max-w-sm relative">
        <div className="flex gap-x-3 content-start items-center">
          <p className="text-lg text-queen-black capitalize truncate max-w-full w-60">
            {title}
          </p>
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
                      onClick={() => deleteOpportunity(opportunity_id)}
                    >
                      Delete
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
              {compensation || salary || budget}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text as="span" color="muted" size="xs">
              Deadline
            </Text>
            <Text as="span" size="sm">
              {deadline || end_date}
            </Text>
          </div>
          <div>
            <Tag>{statusLabel}</Tag>
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
              opportunityId={opportunity_id}
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
