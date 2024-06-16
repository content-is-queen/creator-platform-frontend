import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Campaign = ({
  title,

  description,
  category,
  targetAudience,
  location,
  experience,
  education,
  adType,
  benefits,
  length,
  budget,
  startDate,
  endDate,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="3xl" className="mb-1">
        {title}
      </Heading>
    </div>
    <div className="space-y-5 min-h-24 max-w-lg">
      <div>
        <Subheading>Description</Subheading>
        <Text>{description}</Text>
      </div>

      <div>
        <Subheading>Target Audience</Subheading>
        <Text>{targetAudience}</Text>
      </div>

      <div>
        <Subheading>About the Ad</Subheading>
        <Text>Type</Text>
        <Text>{adType}</Text>
        <Text>Length</Text>
        <Text>{length}</Text>
        <Text>Budget</Text>
        <Text>{budget}</Text>
      </div>

      <div>
        <Subheading>Duration</Subheading>
        <Text>Start Date</Text>
        <Text>{startDate}</Text>
        <Text>End Date</Text>
        <Text>{endDate}</Text>
      </div>
    </div>
  </div>
);
export default Campaign;
