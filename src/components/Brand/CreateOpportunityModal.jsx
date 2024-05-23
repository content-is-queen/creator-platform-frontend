import { useState } from "react";

import Modal from "@/components/Modal";
import CreateOpportunityPanels from "./CreateOpportunityPanels";
import Button from "../Button";

const CreateOpportunityModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" as="button" onClick={() => setIsOpen(true)}>
        Create Opportunity
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select an opportunity type"
        size="6xl"
      >
        <CreateOpportunityPanels />
      </Modal>
    </>
  );
};

export default CreateOpportunityModal;
