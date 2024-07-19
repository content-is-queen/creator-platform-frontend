import { useState } from "react";

import Modal from "@/components/Modal";
import CreateOpportunityPanels from "./CreateOpportunityPanels";
import Button from "../Button";
import Subheading from "../Subheading";

const CreateOpportunityModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        as="button"
        onClick={() => setIsOpen(true)}
        variant="blue"
        size="lg"
      >
        Create Opportunity
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-5xl"
      >
        <Subheading size="lg" className="text-center mb-8">
          Select an opportunity type
        </Subheading>
        <CreateOpportunityPanels />
      </Modal>
    </>
  );
};

export default CreateOpportunityModal;
