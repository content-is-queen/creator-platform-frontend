import parse from "html-react-parser";

import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Job = ({
  title,
  description,
  category,
  location,
  experience,
  skills,
  salary,
  benefits,
  deadline,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="4xl" className="mb-1 text-balance">
        {title}
      </Heading>
      <Text className="capitalize">
        {category} &bull; {location} &bull; {salary || "To be discussed"}
      </Text>
    </div>
    <div className="space-y-8 min-h-24 max-w-lg">
      <div>
        <Subheading size="xl" className="mb-2">
          About
        </Subheading>
        <div className="format">{parse(description)}</div>
      </div>
      {skills.length > 0 && (
        <div>
          <Subheading size="xl" className="mb-1">
            Skills
          </Subheading>
          <p>{skills.join(", ")}</p>
        </div>
      )}
      {benefits && (
        <div>
          <Subheading size="xl">Benefits</Subheading>
          <div className="format">{parse(benefits)}</div>
        </div>
      )}
      {experience && (
        <div>
          <Subheading>Experience</Subheading>
          <Text>{experience}</Text>
        </div>
      )}
      <div>
        <Subheading>Deadline</Subheading>
        <Text>{deadline}</Text>
      </div>
    </div>
  </div>
);

export default Job;
