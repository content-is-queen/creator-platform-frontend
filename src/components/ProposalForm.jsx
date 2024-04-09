"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";

import useAuth from "@/hooks/useAuth";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { inputStyles } from "@/components/Input";

const ProposalModal = ({ isOpen, setIsOpen, children }) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Apply">
    {children}
  </Modal>
);

const ProposalForm = ({ opportunityId }) => {
  const {
    user: { user_id },
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");

  const handleSubmit = async (e, opportunityId, userId) => {
    e.preventDefault();

    const postData = {
      opportunity_id: opportunityId,
      user_id: userId,
      proposal: proposal,
    };

    try {
      await API.post("/opportunities", postData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button as="button" type="button" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <ProposalModal setIsOpen={setIsOpen} isOpen={isOpen}>
        <form onSubmit={(e) => handleSubmit(e, opportunityId, user_id)}>
          <div className="space-y-10">
            <label for="proposal">Proposal</label>
            <textarea
              onChange={(e) => setProposal(e.target.value)}
              name="proposal"
              className={twMerge(inputStyles.input)}
              required
            />
          </div>

          <Button as="button" type="submit" className="mt-8">
            Submit
          </Button>
        </form>
      </ProposalModal>
    </>
  );
};

export default ProposalForm;
