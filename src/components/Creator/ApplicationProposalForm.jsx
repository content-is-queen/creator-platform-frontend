"use client";

import API from "@/api/api";
import { useState } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useUser } from "@/context/UserContext";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Subheading from "../Subheading";
import Text from "@/components/Text";

const ApplicationProposalForm = ({
  opportunityId,
  authorId,
  applicationInstructions,
}) => {
  const { user } = useUser();

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
          "Content-Type": "application/json",
        },
      });
      setStatus("submitted");
    } catch (err) {
      console.log("error", err);
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
        className="sticky top-0 inline-flex gap-2 items-center"
        onClick={() => setIsOpen(true)}
      >
        <span>Send a proposal</span>{" "}
        {!user && <FontAwesomeIcon className="mb-1" icon={faLock} />}
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-2xl"
      >
        <Subheading size="lg">{user && "Write proposal"}</Subheading>
        {user ? (
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
        ) : (
          <div className="space-y-4 text-center">
            <Subheading size="lg">Login to apply</Subheading>
            <Button href={`/login?returnTo=${window.location.pathname}`}>
              Login
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ApplicationProposalForm;
