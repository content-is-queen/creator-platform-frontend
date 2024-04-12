import clsx from "clsx";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Panel from "@/components/Panel";

import data from "@/data/opportunity_data.json";

const CreateOpportunityPanels = () => (
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
            classes.panel
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
            <FontAwesomeIcon className={classes.arrow} icon={faArrowRight} />
          </Link>
        </Panel>
      );
    })}
  </div>
);

export default CreateOpportunityPanels;
