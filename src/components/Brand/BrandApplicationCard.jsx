import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import API from "@/api/api";
import Heading from "../Heading";

async function getUser(id) {
  try {
    const res = await API(`/auth/user/${id}`);

    const { message } = res;
    return message;
  } catch (error) {
    throw new Error("Something went wrong when getting the user");
  }
}

const BrandApplicationCard = async ({
  setApplications,
  applications,
  application_id,
  opportunityTitle,
  proposal,
  user_id,
}) => {
  const { first_name, last_name } = await getUser(user_id);
  const rejectApplication = async (id) => {
    try {
      await API.put(`/applications/${id}`, { status: "rejected" });
      setApplications(
        applications.filter((i) => i.application_id !== application_id)
      );
    } catch (error) {
      throw new Error("Rejecting application error");
    }
  };
  const acceptApplication = async (id) => {
    try {
      await API.put(`/applications/${id}`, { status: "accepted" });
      setApplications(
        applications.filter((i) => i.application_id !== application_id)
      );
      // TODO: Add screen to take to conversation
    } catch (error) {
      throw new Error("Accepting application error");
    }
  };

  return (
    <Card className="h-[488px] max-h-screen flex flex-col">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Heading size="2xl">
            {first_name} {last_name}
          </Heading>
          <Text size="sm" className="capitalize">
            {opportunityTitle} &bull; Application
          </Text>
        </div>
        <div className="flex gap-2 mt-1">
          {/* {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))} */}
        </div>
      </div>

      <Text> {proposal}</Text>

      <div className="flex gap-2 mt-auto pt-12">
        <Button
          type="button"
          as="button"
          variant="white"
          size="sm"
          onClick={() => rejectApplication(application_id)}
        >
          Reject
        </Button>
        <Button
          type="button"
          as="button"
          size="sm"
          onClick={() => acceptApplication(application_id)}
        >
          Accept
        </Button>
        <Button
          type="button"
          variant="blue"
          size="sm"
          href={`/profile/${user_id}`}
        >
          View profile
        </Button>
      </div>
    </Card>
  );
};

export default BrandApplicationCard;
