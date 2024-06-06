import { useState } from "react";

import Modal from "@/components/Modal";
import CreateOpportunityPanels from "./CreateOpportunityPanels";
import Button from "../Button";

const CreateOpportunityModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        as="button"
        onClick={() => setIsOpen(true)}
        variant="yellow"
      >
        Create Opportunity
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="What type of project?"
        className="max-w-5xl"
      >
        <CreateOpportunityPanels />
      </Modal>
    </>
  );
};

export default CreateOpportunityModal;
