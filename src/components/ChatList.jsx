"use client";

import clsx from "clsx";
import { formatDistance } from "date-fns";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

import ProfileIcon from "./ProfileIcon";
import Subheading from "./Subheading";

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
  }, []);
  return (
    <ul
      className="bg-white rounded-3xl shadow-md col-span-4 overflow-y-auto"
      style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
    >
      {user &&
        rooms?.map((room) => {
          const participant = room.userProfiles.find(
            (i) => i.userId != user.uid
          );

          // Convert firebase timestamp
          const timestamp = room.timeSent
            ? new Date(
                room.timeSent.seconds * 1000 +
                  room.timeSent.nanoseconds / 1000000
              )
            : new Date();

          const now = new Date();

          const timeSent = formatDistance(timestamp, now, { addSuffix: true });

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
                      profilePhoto={participant.profilePhoto}
                      className="lg:h-14 lg:w-14"
                    />
                  </div>

                  <div className="py-3 flex-1">
                    <div className="flex gap-4 justify-between items-center">
                      <Subheading size="sm" className="truncate -mb-1">
                        {participant.fullName}
                      </Subheading>
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
