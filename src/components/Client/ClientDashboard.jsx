import clsx from "clsx";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCross } from "@fortawesome/free-solid-svg-icons";

import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ProjectsTabs from "@/components/Client/ProjectsTabs";
import Button from "@/components/Button";
import Panel from "../Panel";
import Link from "next/link";

const ClientDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: get opportunites from API

  const opportunityTypes = [
    {
      label: "Pitch",
      type: "pitch",
      description:
        "An introductory presentation that provides a quick summary of yourself.",
      classes: {
        panel: "bg-queen-orange text-white bg-purple-dots-circle",
        arrow: "text-queen-orange",
      },
    },
    {
      label: "Job",
      type: "job",
      description:
        "A piece of work, especially a specific task done as part of the routine of one's occupation or for an agreed price",
      classes: {
        panel: "bg-queen-blue text-white bg-purple-dots-circle",
        arrow: "text-queen-blue",
      },
    },
    {
      label: "Advertising Campaign",
      type: "campaign",

      description:
        "An advertising campaign is a series of advertisement messages that share a single idea",
      classes: {
        panel: "bg-queen-black text-white bg-purple-dots-circle",
        arrow: "text-queen-black",
      },
    },
  ];

  const opportunities = [
    {
      status: "in_progress",
      title: "Email Marketing",
      type: "Pitch",
      budget: "less than £500",
      deadline: "2 Mar 2024",
    },
    {
      status: "live",
      title: "Podcast Editor",
      type: "Job",
      budget: "2k",
      deadline: "5 Mar 2024",
    },
    {
      status: "in_progress",
      title: "Manager",
      type: "Job",
      budget: "Under 5k",
      deadline: "6 April 2024",
    },
    {
      status: "completed",
      title: "Drop in guest",
      type: "Pitch",
      budget: "£200",
      deadline: "5 June 2024",
    },
  ];

  return (
    <>
      <MainNav />
      <div className="bg-queen-white h-full py-12 md:py-20">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <Heading>Projects</Heading>
            <Button type="button" as="button" onClick={() => setIsOpen(true)}>
              Create Opportunity
            </Button>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <div
                className="fixed inset-0 bg-queen-black/75"
                aria-hidden="true"
              />
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-5xl rounded-3xl bg-white py-16 px-10">
                  <Dialog.Title>
                    <Heading size="2xl" className="text-center mb-12">
                      Select an opportunity type
                    </Heading>
                  </Dialog.Title>

                  <div className="flex gap-3">
                    {opportunityTypes.map((opp) => (
                      <Panel
                        key={opp.label}
                        className={clsx(
                          "flex flex-col justify-between basis-1/3",
                          opp.classes.panel
                        )}
                      >
                        <div>
                          <h2 className="text-xl font-subheading font-bold my-3">
                            {opp.label}
                          </h2>
                          <p className="text-sm">{opp.description}</p>
                        </div>
                        <Link
                          href={{
                            pathname: `/opportunities/create/${opp.type}`,
                          }}
                          className="bg-white h-7 w-7 self-end justify-self-end flex items-center justify-center rounded-full mt-8"
                        >
                          <FontAwesomeIcon
                            className={opp.classes.arrow}
                            icon={faArrowRight}
                          />
                        </Link>
                      </Panel>
                    ))}
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
          <ProjectsTabs opportunities={opportunities} />
        </Container>
      </div>
    </>
  );
};

export default ClientDashboard;
