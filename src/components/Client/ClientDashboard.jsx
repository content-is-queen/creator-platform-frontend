import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ProjectsTabs from "@/components/Client/ProjectsTabs";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import Panel from "@/components/Panel";

import data from "@/data/opportunity_data.json";

const OpportunityPanels = () => (
    <div className="flex gap-3 text-black">
        {Object.entries(data).map(([name, opp]) => {
            let classes;
            switch (name) {
                case "job":
                    classes = {
                        panel: "bg-queen-blue text-white bg-purple-dots-circle",
                        arrow: "text-queen-blue",
                    };
                    break;
                case "campaign":
                    classes = {
                        panel: "bg-queen-black text-white bg-purple-dots-circle",
                        arrow: "text-queen-black",
                    };
                    break;
                default:
                    classes = {
                        panel: "bg-queen-orange text-white bg-purple-dots-circle",
                        arrow: "text-queen-orange",
                    };
            }

            return (
                <Panel
                    key={name}
                    className={clsx(
                        "flex flex-col justify-between basis-1/3",
                        classes.panel,
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
                            pathname: `/opportunities/create/${name}`,
                        }}
                        className="bg-white h-7 w-7 self-end justify-self-end flex items-center justify-center rounded-full mt-8"
                    >
                        <FontAwesomeIcon
                            className={classes.arrow}
                            icon={faArrowRight}
                        />
                    </Link>
                </Panel>
            );
        })}
    </div>
);

const OpportunityModal = ({ isOpen, setIsOpen }) => (
    <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
    >
        <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="mx-auto w-full max-w-5xl rounded-3xl bg-white py-16 px-10">
                <Dialog.Title>
                    <Heading size="2xl" className="text-center mb-12">
                        Select an opportunity type
                    </Heading>
                </Dialog.Title>

                <OpportunityPanels />
            </Dialog.Panel>
        </div>
    </Dialog>
);

const ClientDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const opportunities = [];

    if (opportunities.length < 1) {
        return (
            <Container>
                {" "}
                <Empty
                    href="/opportunities"
                    button={
                        <Button
                            type="button"
                            as="button"
                            onClick={() => setIsOpen(true)}
                        >
                            Create Opportunity
                        </Button>
                    }
                >
                    Looks like you haven't listed any opportunities yet.
                </Empty>
                <OpportunityModal setIsOpen={setIsOpen} isOpen={isOpen} />
            </Container>
        );
    }

    return (
        <div className="h-full py-12 md:py-20">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <Heading>Projects</Heading>
                    <Button
                        type="button"
                        as="button"
                        onClick={() => setIsOpen(true)}
                    >
                        Create Opportunity
                    </Button>
                </div>
                <ProjectsTabs opportunities={opportunities} />
                <OpportunityModal setIsOpen={setIsOpen} isOpen={isOpen} />
            </Container>
        </div>
    );
};

export default ClientDashboard;
