"use client";

import moment from "moment";

import { useEffect } from "react";

import clsx from "clsx";
import ProfileIcon from "./ProfileIcon";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";

const ChatList = ({ active, setActive, rooms }) => {
  const { user } = useUser();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (rooms && searchParams) {
      const createdRoom = rooms.find(
        (room) => room.id === searchParams.get("room")
      );
      setActive(createdRoom);
    }
  }, [rooms]);
  return (
    <ul
      className="bg-white rounded-3xl shadow-md col-span-4 overflow-y-auto"
      style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
    >
      {rooms.map((room) => {
        const participant = room.userProfiles.find((i) => i.userId != user.uid);

        // Convert firebase timestamp
        const firbaseTime = new Date(
          room.timeSent._seconds * 1000 + room.timeSent._nanoseconds / 1000000
        );
        const date = firbaseTime.toDateString();

        const atTime = firbaseTime.toLocaleTimeString();

        const timeSent = moment(`${date} ${atTime}`).fromNow();

        return (
          <li key={room.id} className="first:rounded-t-3xl overflow-hidden">
            <button
              type="button"
              className="w-full"
              onClick={() => setActive(room)}
            >
              <div
                className={clsx(
                  "flex items-center gap-x-4 px-6 py-2 hover:bg-queen-gray/40 border-t-0 border-b last:border-b-0 border-gray-200 border-solid",
                  active?.id === room.id && "bg-queen-gray/40"
                )}
              >
                <div className="shrink-0">
                  <ProfileIcon
                    imageUrl={participant.profileImage}
                    className="lg:h-14 lg:w-14"
                  />
                </div>

                <div className="py-3 flex-1">
                  <div className="flex gap-4 justify-between items-center">
                    <p className="text-sm  text-queen-black font-subheading font-bold truncate leading-3">
                      {participant.fullName}
                    </p>
                    <div className="text-xs text-queen-black/60 justify-self-end">
                      {timeSent}
                    </div>
                  </div>

                  <div className="space-y-1 max-w-[150px] w-full">
                    <p className="text-left text-xs text-queen-black/60 w-full max-w-30 truncate">
                      {room.opportunityTitle}
                    </p>
                    <p className="text-left text-sm text-queen-black/60 truncate">
                      {room.senderId === user.uid && "You: "}
                      {room.lastMessage || ""}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
