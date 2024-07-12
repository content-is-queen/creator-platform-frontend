import parse from "html-react-parser";

import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Campaign = ({
  title,
  description,
  targetAudience,
  adType,
  length,
  budget,
  startDate,
  endDate,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="3xl" className="mb-1 text-balance">
        {title}
      </Heading>
    </div>
    <div className="space-y-5 min-h-24 max-w-lg">
      <div>
        <Subheading>Description</Subheading>
        <div className="format">{parse(description)}</div>
      </div>

      {targetAudience && (
        <div>
          <Subheading>Target Audience</Subheading>
          <Text>{targetAudience}</Text>
        </div>
      )}

      {targetAudience.length > 0 && (
        <div>
          <Subheading className="mb-1">Target Audience</Subheading>
          {targetAudience.join(",")}
        </div>
      )}

      {adType ||
        length ||
        (budget && (
          <div>
            <Subheading>About the Ad</Subheading>
            {adType && (
              <div className="flex gap-1">
                <Text size="sm">Type</Text>
                <Text size="sm" color="muted">
                  {adType}
                </Text>
              </div>
            )}

            {length && (
              <div className="flex gap-1">
                <Text size="sm">Length</Text>
                <Text size="sm" color="muted">
                  {length}
                </Text>
              </div>
            )}
            {budget && (
              <div className="flex gap-1">
                <Text size="sm">Budget</Text>
                <Text size="sm" color="muted">
                  {budget}
                </Text>
              </div>
            )}
          </div>
        ))}

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
