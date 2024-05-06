"use client";

import API from "@/api/api";

import { useState } from "react";

import { useUser } from "@/context/UserContext";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";

const ProposalForm = ({ opportunityId }) => {
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (opportunityId, userId) => {
    const postData = {
      opportunity_id: opportunityId,
      user_id: user.uid,
      proposal: proposal,
    };

    try {
      await API.post("/applications", postData);
      window.location.reload();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setErrors({
        message: "Something went wrong...",
      });
      console.error(message);
    }
  };

  return (
    <>
      <Button as="button" type="submit" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Apply">
        <Form
          errors={errors}
          setErrors={setErrors}
          handleSubmit={() => handleSubmit(opportunityId, user.uid)}
        >
          <Form.Textarea
            name="proposal"
            onChange={(e) => setProposal(e.target.value)}
            rows={10}
            minlength="5"
            required
          >
            Tell us your plan of action
          </Form.Textarea>

          <Button as="button" type="submit" className="mt-8">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ProposalForm;
