"use client";

import API from "@/api/api";

import { twMerge } from "tailwind-merge";
import { useState } from "react";

import useAuth from "@/hooks/useAuth";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { inputStyles } from "@/components/Input";

const ProposalForm = ({ opportunityId }) => {
  const {
    user: { user_id },
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (opportunityId, userId) => {
    const postData = {
      opportunity_id: opportunityId,
      user_id: userId,
      proposal: proposal,
    };

    try {
      await API.post("/applications", postData);
    } catch (error) {
      setErrors({
        message: "Something went wrong...",
      });
      console.error(error.message);
    }
  };

  return (
    <>
      <Button as="button" type="submit" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Apply">
        <Form
          errors={errors}
          onSubmit={() => handleSubmit(opportunityId, user_id)}
        >
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
        </Form>
      </Modal>
    </>
  );
};

export default ProposalForm;
