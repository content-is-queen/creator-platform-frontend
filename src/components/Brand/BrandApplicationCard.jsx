import { useEffect, useState } from "react";

import useToken from "@/hooks/useToken";
import API from "@/api/api";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Tag from "@/components/Tag";
import Heading from "@/components/Heading";
import { useUser } from "@/context/UserContext";

const BrandApplicationCard = ({
  setApplications,
  applications,
  application_id,
  opportunityTitle,
  proposal,
  user_id,
}) => {
  const token = useToken();
  const {
    user: { uid },
  } = useUser();
  const [user, setUser] = useState(null);

  const getUser = async (id) => {
    try {
      const res = await API(`/auth/user/${id}`);

      const { message } = res;
      setUser(message);
      return message;
    } catch (error) {
      throw new Error("Something went wrong when getting the user");
    }
  };

  useEffect(() => {
    getUser(user_id);
  }, []);

  const rejectApplication = async (id) => {
    try {
      const response = await API(`/auth/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "rejected",
          user_id: user_id,
          creator_id: uid,
        }),
      });

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when rejecting the application"
        );
      }

      setApplications(
        applications.filter((i) => i.application_id !== application_id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const acceptApplication = async (id) => {
    try {
      const response = await API(`/auth/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when accpeting the application"
        );
      }

      setApplications(
        applications.filter((i) => i.application_id !== application_id)
      );
      // TODO: Add screen to take to conversation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-[488px] max-h-screen flex flex-col">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Heading size="2xl">
            {!user ? (
              <LoadingPlaceholder dark />
            ) : (
              <>
                {user?.first_name} {user?.last_name}
              </>
            )}
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

      {!user ? <LoadingPlaceholder /> : <Text>{proposal}</Text>}

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
