import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Modal from "@/components/Modal";

const OpportunityModal = (props) => {
  console.log(props);
  return (
    <Modal open={true}>
      <p className="mb-2 text-sm text-queen-black/80 font-semibold">
        Click to upload
      </p>
    </Modal>
  );
};

export default OpportunityModal;
