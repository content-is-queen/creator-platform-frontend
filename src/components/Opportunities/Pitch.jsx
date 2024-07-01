import Text from "../Text";
import Heading from "@/components/Heading";
import Subheading from "../Subheading";

const Pitch = ({
  title,
  description,
  targetAudience,
  contentDuration,
  contentType,
  budget,
  keyMessage,
}) => (
  <div className="space-y-8">
    <div>
      <Heading size="3xl" className="mb-1">
        {title}
      </Heading>
      <Text className="capitalize">{budget}</Text>
    </div>
    <div className="space-y-5 min-h-24 max-w-lg">
      <div>
        <Subheading>Description</Subheading>
        <Text>{description}</Text>
      </div>
      {targetAudience && (
        <div>
          <Subheading>Target Audience</Subheading>
          <Text>{targetAudience}</Text>
        </div>
      )}
      {contentDuration && (
        <div>
          <Subheading>Expected Content Duration</Subheading>
          <Text>{contentDuration}</Text>
        </div>
      )}
      {contentType && (
        <div>
          <Subheading>Type of content</Subheading>
          <Text>{contentType}</Text>
        </div>
      )}
      {keyMessage && (
        <div>
          <Subheading>Key Message or Theme</Subheading>
          <Text>{keyMessage}</Text>
        </div>
      )}
    </div>
  </div>
);
export default Pitch;
