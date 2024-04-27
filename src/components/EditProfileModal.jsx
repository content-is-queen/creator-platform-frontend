import { useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import EditProfileForm from "@/components/EditProfileForm";

const EditProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (e) => {
    setIsOpen(e);
  };

  return (
    <>
      <Button
        as="button"
        onClick={() => setIsOpen(true)}
        type="button"
        variant="yellow"
      >
        Edit Profile
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        heading="Edit profile"
      >
        <EditProfileForm isOpen={handleIsOpen} />
      </Modal>
    </>
  );
};

export default EditProfileModal;
