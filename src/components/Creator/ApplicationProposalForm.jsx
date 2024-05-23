"use client";

import API from "@/api/api";

import { useState,  useEffect } from "react";

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
  const [promptText, setPromptText] = useState(
    "Write how you will approach the opportunity"
  );

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
      const response = await API.post(`/applications`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setStatus("submitted");
    } catch (err) {
      setError({
        message: "Something went wrong...",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch opportunity data and update prompt text
  const fetchOpportunityData = async () => {
    try {
      const response = await API.get(`/opportunities/opportunityid/${opportunityId}`);
      const opportunityData = response.data;
console.log('tttttttttttttt',opportunityData)
      if (opportunityData.prompt) {
        setPromptText(opportunityData.prompt);
      }
    } catch (error) {
      console.error("Error fetching opportunity data:", error);
    }
  };

  // Fetch opportunity data when component mounts
  useEffect(() => {
    fetchOpportunityData();
  }, []);

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
            {promptText}
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
