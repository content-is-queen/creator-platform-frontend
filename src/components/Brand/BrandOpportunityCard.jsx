import { Menu } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

const BrandOpportunityCard = (props) => {
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
    <Card className="inline-block space-y-4 w-full max-w-sm relative">
      <div className="flex gap-x-3 content-start items-center justify-between">
        <div className="flex content-start w-full justify-between items-start md:items-center">
          <p className="mr-3 text-queen-black capitalize">{title}</p>
          <Tag className="inline-block">{statusLabel}</Tag>
        </div>
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

      <Button variant="white" href={`/project/${opportunityId}`}>
        View Project
      </Button>
    </Card>
  );
};

export default BrandOpportunityCard;
