"use client";

import { useState } from "react";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Tag from "../Tag";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ButtonText from "@/components/ButtonText";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Subheading from "../Subheading";
import {
  getDoc,
  doc,
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const StatusIcon = ({ status }) => {
  const icon = {
    accepted: { icon: faCircleCheck, className: "text-green-500/60" },
    rejected: { icon: faCircleXmark, className: "text-red-500/60" },
    pending: { icon: faClock, className: "text-queen-black/60" },
  };

  return <FontAwesomeIcon title={status} {...icon[status]} />;
};

const BrandApplicationCard = ({
  applicationId,
  opportunityTitle,
  opportunityId,
  proposal,
  onReject,
  status,
  interests,
  creatorId,
  firstName,
  lastName,
}) => {
  const [message, setMessage] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const LIMIT = 300;

  const truncateProposal = proposal.length > LIMIT;

  const truncatedProposal = truncateProposal
    ? proposal.slice(0, LIMIT) + "..."
    : proposal;

  const { user } = useUser();

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
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
          opportunityTitle,
          opportunityId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      setMessage({ status: "accepted", room: response.data.message.roomId });

      const roomRef = await getDoc(
        doc(db, "rooms", response.data.message.roomId)
      );

      const messageData = {
        uid: creatorId,
        createdAt: serverTimestamp(),
        message: proposal,
      };

      await addDoc(
        collection(db, "rooms", response.data.message.roomId, "messages"),
        messageData
      );

      await updateDoc(roomRef, {
        lastMessage: proposal,
        senderId: user.uid,
        timeSent: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  return (
    <Card className="flex flex-col items-start">
      {message?.status === "accepted" ? (
        <div className="text-center flex items-center flex-col justify-center mx-auto">
          <div className="max-w-xs mb-5">
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
          <div className="flex items-center justify-between w-full gap-2 mb-6">
            <StatusIcon status={status} />

            {interests && (
              <div className="flex gap-2 flex-wrap ml-auto">
                {interests.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            )}
          </div>
          <Subheading className="mb-1">
            {firstName} {lastName}
          </Subheading>

          <Text size="sm">{seeMore ? proposal : truncatedProposal}</Text>
          {truncateProposal && (
            <ButtonText
              as="button"
              className="mt-6 w-auto text-xs"
              onClick={() => setSeeMore(!seeMore)}
            >
              See {seeMore ? "less" : "more"}
            </ButtonText>
          )}

          <div className="flex gap-2 mt-auto pt-12">
            {status === "pending" && (
              <>
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
              </>
            )}
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
