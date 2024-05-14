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
  const [errors, setError] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (opportunityId, clientId) => {
    const postData = {
      opportunity_id: opportunityId,
      user_id: user.uid,
      brand_id: clientId,
      proposal: proposal,
    };

    await API(
      "/applications",
      {
        method: "POST",
      },
      postData
    )
      .then((data) => {
        setStatus("submitted");
      })
      .catch((err) => {
        setError({
          message: "Something went wrong...",
        });

        console.log("An error has occurred", err);
      });
  };

  if (status === "submitted" && Object.entries(errors).length < 1) {
    return <>Thank you</>;
  }

  return (
    <>
      <Button as="button" type="submit" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Apply">
        <Form
          errors={errors}
          setError={setError}
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
            {loading && <Button.Spinner />} Apply
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ProposalForm;
