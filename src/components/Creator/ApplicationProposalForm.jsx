"use client";

import API from "@/api/api";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Subheading from "../Subheading";

const ApplicationProposalForm = ({
  opportunityId,
  authorId,
  applicationInstructions,
}) => {
  const { user } = useUser();
  const { token } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError({});
    setLoading(true);

    const data = {
      opportunityId: opportunityId,
      creatorId: user.uid,
      authorId: authorId,
      proposal: proposal,
    };

    try {
      await API.post(`/applications`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setStatus("submitted");
    } catch (err) {
      console.log(err);
      setError({
        message: err.response.data.message || "Something went wrong...",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "submitted") {
    return <Form.Success>Your application was sent successfully</Form.Success>;
  }

  if (user?.uid === authorId) {
    return null;
  }

  return (
    <>
      <Button
        as="button"
        type="submit"
        size="lg"
        className="sticky top-0"
        onClick={() => setIsOpen(true)}
      >
        Send A Proposal
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-2xl"
      >
        <Subheading size="lg">Write proposal</Subheading>
        <Form error={error} setError={setError} handleSubmit={handleSubmit}>
          <Form.Textarea
            name="proposal"
            onChange={(e) => setProposal(e.target.value)}
            rows={10}
            minLength={5}
            className="normal-case"
            required
          >
            {applicationInstructions ||
              "Explain why you should be hired for this opportunity"}
          </Form.Textarea>

          <Button as="button" type="submit" className="mt-8">
            {loading && <Button.Spinner />} Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ApplicationProposalForm;
