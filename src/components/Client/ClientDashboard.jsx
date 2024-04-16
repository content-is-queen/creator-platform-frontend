"use client";

import { useState, useEffect } from "react";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ProjectsTabs from "@/components/Client/ProjectsTabs";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import CreateOpportunityPanels from "@/components/Client/CreateOpportunityPanels";

import API from "@/api/api";

const ClientDashboard = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);

  const getOpportunities = async (id) => {
    try {
      const response = await API.get(`/opportunities/id/${id}`);
      setOpportunities(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOpportunities(id);
  }, []);

  useEffect(() => {}, [isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!opportunities || opportunities.length < 1) {
    return (
      <>
        <Empty
          href="/opportunities"
          button={
            <Button type="button" as="button" onClick={() => setIsOpen(true)}>
              Create Opportunity
            </Button>
          }
        >
          Looks like you haven't listed any opportunities yet.
        </Empty>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Select an opportunity type"
          size="6xl"
        >
          <CreateOpportunityPanels />
        </Modal>
      </>
    );
  }

  return (
    <div className="h-full py-12 md:py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <Heading>Projects</Heading>
          <Button type="button" as="button" onClick={() => setIsOpen(true)}>
            Create Opportunity
          </Button>
        </div>
        <ProjectsTabs opportunities={opportunities} />
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Select an opportunity type"
          size="6xl"
        >
          <CreateOpportunityPanels />
        </Modal>
      </Container>
    </div>
  );
};

export default ClientDashboard;
