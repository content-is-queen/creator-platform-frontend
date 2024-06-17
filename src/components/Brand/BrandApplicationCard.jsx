import { useEffect, useState } from "react";

import useToken from "@/hooks/useToken";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Tag from "../Tag";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Heading from "@/components/Heading";

const BrandApplicationCard = ({
  setApplications,
  applications,
  applicationId,
  opportunityTitle,
  proposal,
  creatorId,
}) => {
  const { token } = useToken();
  const {
    user: { uid },
  } = useUser();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const getUser = async (id) => {
    try {
      const res = await API.get(`/auth/user/${id}`);
      const { data } = res;
      setUser(data.message);
    } catch ({ error }) {
      throw new Error("Something went wrong when getting the user");
    }
  };

  useEffect(() => {
    getUser(creatorId);
  }, []);

  const rejectApplication = async (id) => {
    try {
      const response = await API.patch(
        `/applications/${id}`,
        {
          status: "rejected",

          authorId: uid,
          creatorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when rejecting the application"
        );
      }

      setApplications(
        applications.filter((i) => i.applicationId !== applicationId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const acceptApplication = async (id) => {
    try {
      const response = await API.patch(
        `/applications/${id}`,
        {
          status: "accepted",
          authorId: uid,
          creatorId,
          opportunityTitle: opportunityTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when accpeting the application"
        );
      }

      setMessage({ status: "accepted", room: response.data.message.roomId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-[488px] max-h-screen flex flex-col">
      {message?.status === "accepted" ? (
        <div
          className="text-center flex items-center flex-col justify-center"
          style={{ height: "inherit" }}
        >
          <div className="max-w-xs mx-auto mb-5">
            <p className="text-subheading text-queen-black font-bold text-xl mb-2">
              Start chatting!
            </p>
            <p className="text-queen-black/80">
              What are you waiting for? Why don't you head over and start the
              conversation with <b>{user.firstName}</b>.
            </p>
          </div>
          <Button href={`/conversations/?room=${message.room}`}>
            Start conversation
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <Heading size="2xl">
                {!user ? (
                  <LoadingPlaceholder dark />
                ) : (
                  <>
                    {user.firstName} {user.lastName}
                  </>
                )}
              </Heading>
              <Text size="sm" className="capitalize">
                {opportunityTitle} &bull; Application
              </Text>
            </div>
            <div className="flex gap-2 mt-1">
              {user?.interests.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </div>

          {!user ? <LoadingPlaceholder /> : <Text>{proposal}</Text>}

          <div className="flex gap-2 mt-auto pt-12">
            <Button
              type="button"
              as="button"
              variant="white"
              size="sm"
              onClick={() => rejectApplication(applicationId)}
            >
              Reject
            </Button>
            <Button
              type="button"
              as="button"
              size="sm"
              onClick={() => acceptApplication(applicationId)}
            >
              Accept
            </Button>
            <Button
              type="button"
              variant="blue"
              size="sm"
              target="_blank"
              href={`/profile/${creatorId}`}
            >
              View profile
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default BrandApplicationCard;
