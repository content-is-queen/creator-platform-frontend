import { useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import SubMenu from "../SubMenu";

const ClientOpportunityCard = ({ budget, deadline, status, title }) => {
  const [open, setOpen] = useState(false);

  // TODO: get applications count - cache value

  const plurise = (word, value) => {
    return value === 1 ? word : word + "s";
  };

  const statusLabel = status.replace("_", " ");
  const viewCount = 100;
  const viewLabel = plurise("view", viewCount);

  // TODO: replace with calculation from db
  const applicationCount = 1;
  const applicationLabel = plurise("application", applicationCount);

  const editOpportunity = () => {
    // TODO: open modal with form to update
  };

  const deleteOpportunity = () => {
    // TODO: delete confirm delete modal, then remove
  };

  const subMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Card className="inline-block space-y-4 w-full max-w-sm relative">
      <div className="flex content-start items-center">
        <p className="text-lg mr-3 text-queen-black capitalize">{title}</p>
        <Tag>{statusLabel}</Tag>
        <button type="button" className="ml-auto pl-2" onClick={subMenuToggle}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {open && (
          <SubMenu>
            <SubMenu.Item>
              <button
                type="button"
                onClick={editOpportunity}
                className="px-4 py-1 w-full text-left inline-block"
              >
                Edit
              </button>
            </SubMenu.Item>
            <SubMenu.Item>
              <button
                type="button"
                onClick={deleteOpportunity}
                className="px-4 py-1 w-full text-left inline-block"
              >
                Delete
              </button>
            </SubMenu.Item>
          </SubMenu>
        )}
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col">
          <Text as="span" color="muted" size="xs">
            Budget
          </Text>
          <Text as="span" size="sm">
            {budget}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text as="span" color="muted" size="xs">
            Deadline
          </Text>
          <Text as="span" size="sm">
            {deadline}
          </Text>
        </div>
      </div>

      <div className="uppercase text-xs">
        <p>
          {viewCount} {viewLabel}
        </p>
        <p>
          {applicationCount} {applicationLabel}
        </p>
      </div>

      <Button variant="white" type="button" as="button">
        View Applications
      </Button>
    </Card>
  );
};

export default ClientOpportunityCard;
