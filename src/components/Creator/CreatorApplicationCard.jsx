import { useState } from "react";

import useOpportunities from "@/hooks/useOpportunities";

import Card from "@/components/Card";
import Tag from "@/components/Tag";
import ProfileIcon from "@/components/ProfileIcon";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const CreatorApplicationCard = ({ status, opportunity_id, proposal }) => {
  const { opportunities: opportunity, loading } = useOpportunities({
    opportunity_id: opportunity_id,
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card className="flex items-center justify-between">
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <div className="flex gap-x-2 md:gap-x-4 items-center">
            <ProfileIcon />
            <p className="truncate w-full max-w-20 md:max-w-32">
              {opportunity?.title}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Tag>{status}</Tag>
            {modalOpen && (
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Application"
              >
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
