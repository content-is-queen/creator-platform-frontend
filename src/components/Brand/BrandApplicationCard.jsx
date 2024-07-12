"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Tag from "../Tag";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Subheading from "../Subheading";

const BrandApplicationCard = ({
  setApplications,
  applications,
  applicationId,
  opportunityTitle,
  proposal,
  onReject,
  creatorId,
}) => {
  const [applicant, setApplicant] = useState(null);
  const [message, setMessage] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const { token } = useAuth();
  const { user } = useUser();

  const getApplicant = async (id) => {
    try {
      const res = await API.get(`/auth/user/${id}`);
      const { data } = res;
      setApplicant(data.message);
    } catch ({ error }) {
      setApplications(
        applications.filter((i) => i.applicationId !== applicationId)
      );
      console.error("Something went wrong when getting the user");
    }
  };

  useEffect(() => {
    getApplicant(creatorId);
  }, []);

  const handleReject = () => {
    onReject();
  };

  const rejectApplication = async (id) => {
    setRejectLoading(true);
    try {
      const response = await API.patch(
        `/applications/${id}`,
        {
          status: "rejected",

          authorId: user.uid,
          creatorId,
          opportunityTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleReject();

      if (response?.error) {
        throw new Error(
          response.error ||
            "Something went wrong when rejecting the application"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRejectLoading(false);
    }
  };
  const acceptApplication = async (id) => {
    setAcceptLoading(true);
    try {
      const response = await API.patch(
        `/applications/${id}`,
        {
          status: "accepted",
          authorId: user.uid,
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

      setMessage({ status: "accepted", room: response.data.message.roomId });
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      {message?.status === "accepted" ? (
        <div className="text-center flex items-center flex-col justify-center">
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
          <div className="flex justify-between items-center">
            <Subheading>
              {!applicant ? (
                <LoadingPlaceholder dark />
              ) : (
                <>
                  {applicant.firstName} {applicant.lastName}
                </>
              )}
            </Subheading>
            {applicant?.interests ? (
              <div className="flex gap-2">
                {applicant.interests.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            ) : null}
          </div>

          {!applicant ? (
            <LoadingPlaceholder />
          ) : (
            <Text size="sm">{proposal}</Text>
          )}

          <div className="flex gap-2 mt-auto pt-12">
            <Button
              type="button"
              as="button"
              variant="danger"
              size="sm"
              onClick={() => rejectApplication(applicationId)}
            >
              {rejectLoading && <Button.Spinner />}Reject
            </Button>
            <Button
              type="button"
              as="button"
              size="sm"
              variant="success"
              onClick={() => acceptApplication(applicationId)}
            >
              {acceptLoading && <Button.Spinner />}Accept
            </Button>
            <Button
              type="button"
              variant="white"
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
