import { useState } from "react";

import useOpportunities from "@/hooks/useOpportunities";

import Card from "@/components/Card";
import Tag from "@/components/Tag";
import ProfileIcon from "@/components/ProfileIcon";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Subheading from "../Subheading";
import Text from "../Text";

const CreatorApplicationCard = ({ status, opportunityId, proposal }) => {
  const { opportunities: opportunity, loading } = useOpportunities({
    opportunityId: opportunityId,
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card className="flex items-center justify-between">
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <div className="flex gap-x-2 md:gap-x-4 items-center">
            <ProfileIcon profilePhoto={opportunity.profilePhoto} />
            <p className="truncate w-full max-w-20 md:max-w-32">
              {opportunity.title}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Tag>{status}</Tag>
            {modalOpen && (
              <Modal
                open={modalOpen}
                className="min-h-64 max-w-2xl"
                onClose={() => setModalOpen(false)}
              >
                <Subheading size="xl">{opportunity.title}</Subheading>
                <Text size="sm" className="capitalize mb-6">
                  Application
                </Text>
                {proposal}
              </Modal>
            )}
            <Button
              variant="white"
              size="sm"
              as="button"
              type="button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              View
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default CreatorApplicationCard;
