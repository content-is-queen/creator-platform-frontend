import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Text from "@/components/Text";
import Button from "@/components/Button";

// export const dynamicParams = false;

async function getData() {
    // TODO: fetch opportunity data

    return {
        type: "Pitch",
        description: (
            <>
                <p>
                    A full time position at Global Situation Room, Inc.,
                    Alexandria Virginia, USA
                </p>{" "}
                <p>Position Overview:</p>{" "}
                <p>
                    The Global Situation Room®, Inc is an elite, full-service
                    public affairs agency that provides clients with
                    sophisticated solutions for their most Complex
                    Communications® challenges.
                </p>{" "}
                <p>
                    We are looking to hire a multi-platform Podcast Producer and
                    Editor for three high-profile podcasts. First is a hit
                    international public affairs podcast. The program delves
                    into the most important international news issues of the
                    day. With more than a million downloads and reaching the top
                    charts in over 90 countries, the show has featured
                    influential global leaders including former UK Prime
                    Minister Boris Johnson, former CIA Director General Michael
                    Hayden, former U.S. Secretary of Defense Robert Gates, along
                    with CNN’s Clarissa Ward and more.
                </p>{" "}
                <p>
                    The second podcast is a domestic politics podcast hosted by
                    Johanna Maska, former Director of Press Advance for
                    President Obama’s White House and one of his early campaign
                    staffers. The show explores crucial topics on the national
                    stage, the 2024 presidential race, and how to navigate
                    today’s polarized political environment.
                </p>{" "}
                <p>
                    The third podcast focuses on media, tech, and marketing. The
                    podcast breaks news and brings insights into the most
                    important stories of the week, while looking at media and
                    marketing news and trends from a global perspective.
                </p>
            </>
        ),
        company: {
            name: "The Guardian",
            budget: "Under 1k",
            date: "2 March 2024",
            image: { src: "/images/guardian/png" },
        },
    };
}

export default async function Opportunity({ params }) {
    const data = await getData();

    return (
        <div className="bg-purple-dots bg-repeat-x bg-[center_bottom]">
            <Container size="2xl">
                <div className="mt-20 pb-60 space-y-8">
                    <div>
                        <Link
                            href="/"
                            className="text-sm inline-flex items-center gap-1.5 mb-7"
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="h-2.5 w-2.5"
                            />{" "}
                            <span>Back to Dashboard</span>
                        </Link>
                        <img
                            src="/images/guardian.png"
                            alt="The Guardian"
                            height={54}
                            width={54}
                        />
                        <Heading size="3xl" className="mt-4 mb-1">
                            {params.slug}
                        </Heading>
                        <Text size="sm">
                            {data.company.name} {data.type} &bull;{" "}
                            {data.company.budget} &bull; {data.company.date}
                        </Text>
                    </div>

                    <div className="space-y-5">{data.description}</div>

                    <Button as="button" type="button">
                        Send Proposal
                    </Button>
                </div>
            </Container>
        </div>
    );
}
