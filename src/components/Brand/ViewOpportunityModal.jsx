import parse from "html-react-parser";

import Modal from "../Modal";
import Subheading from "../Subheading";

const ViewOpportunityModal = ({ isOpen, setIsOpen, title, description }) => (
  <Modal
    open={isOpen}
    onClose={() => {
      setIsOpen(false);
    }}
    className="max-w-lg"
  >
    <Subheading size="lg" className="mb-4">
      {title}
    </Subheading>
    <div className="format text-sm">{parse(description)}</div>
  </Modal>
);

export default ViewOpportunityModal;
