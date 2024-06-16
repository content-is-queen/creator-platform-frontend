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
        <div className="flex gap-1">
          <Text size="sm">Type</Text>
          <Text size="sm" color="muted">
            {adType}
          </Text>
        </div>

        <div className="flex gap-1">
          <Text size="sm">Length</Text>
          <Text size="sm" color="muted">
            {length}
          </Text>
        </div>
        <div className="flex gap-1">
          <Text size="sm">Budget</Text>
          <Text size="sm" color="muted">
            {budget}
          </Text>
        </div>
      </div>

      <div>
        <Subheading>Duration</Subheading>
        <div className="flex gap-1">
          <Text size="sm">Start Date</Text>
          <Text size="sm" color="muted">
            {startDate}
          </Text>
        </div>
        <div className="flex gap-1">
          <Text size="sm">End Date</Text>
          <Text size="sm" color="muted">
            {endDate}
          </Text>
        </div>
      </div>
    </div>
  </div>
);
export default Campaign;
