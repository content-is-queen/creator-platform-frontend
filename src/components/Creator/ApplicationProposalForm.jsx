"use client";

import API from "@/api/api";

import { useState } from "react";

import { useUser } from "@/context/UserContext";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import useToken from "@/hooks/useToken";

const ApplicationProposalForm = ({ opportunityId }) => {
  const { user } = useUser();
  const token = useToken();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");
  const [errors, setError] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (opportunityId, clientId) => {
    setError({});
    setLoading(true);

    const data = {
      opportunity_id: opportunityId,
      user_id: user.uid,
      creator_id: clientId,
      proposal: proposal,
    };

    try {
      const response = await API(`/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setStatus("submitted");
      } else {
        setError({ message: response.message });
      }
    } catch (err) {
      setError({
        message: "Something went wrong...",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "submitted") {
    return <>Thank you for your application.</>;
  }

  return (
    <>
      <Button as="button" type="submit" onClick={() => setIsOpen(true)}>
        Send Proposal
      </Button>

      <Modal
        align="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Apply"
      >
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
            Write how you will approach the opportuity
          </Form.Textarea>

          <Button as="button" type="submit" className="mt-8">
            {loading && <Button.Spinner />} Apply
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ApplicationProposalForm;
