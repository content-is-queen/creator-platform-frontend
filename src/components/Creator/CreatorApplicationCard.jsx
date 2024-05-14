import { useEffect, useState } from "react";

import API from "@/api/api";

import Card from "@/components/Card";
import Tag from "@/components/Tag";
import ProfileIcon from "@/components/ProfileIcon";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Button from "@/components/Button";
import Modal from "../Modal";

const CreatorApplicationCard = ({ status, opportunity_id, proposal }) => {
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getOpportunityById(id) {
      try {
        const response = await API(`/opportunities/opportunityid/${id}`);
        setOpportunity(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getOpportunityById(opportunity_id);
  }, [opportunity_id]);

  return (
    <Card className="flex items-center justify-between">
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <div className="flex gap-x-6 items-center">
            <ProfileIcon />
            {opportunity?.title}
          </div>

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
        </>
      )}
    </Card>
  );
};

export default CreatorApplicationCard;
