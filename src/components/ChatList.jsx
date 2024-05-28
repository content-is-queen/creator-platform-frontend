"use client";

import formatDate from "@/helpers/dateFormatter";
import clsx from "clsx";
import ProfileIcon from "./ProfileIcon";

const ChatList = ({ active, setActive, rooms }) => (
  <ul
    className="bg-white rounded-3xl shadow-md col-span-2 overflow-y-auto"
    style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
  >
    {rooms.map((room) => (
      <li key={room.id} className="first:rounded-t-3xl overflow-hidden">
        <button
          type="button"
          className="w-full"
          onClick={() => setActive(room)}
        >
          <div
            className={clsx(
              "flex items-center gap-x-4 px-6 py-1 hover:bg-queen-gray/80 border-t-0 border-b last:border-b-0 border-gray-200 border-solid",
              active?.id === room.id && "bg-queen-gray/40"
            )}
          >
            <div className="shrink-0">
              <ProfileIcon className="h-14 w-14" />
            </div>

            <div className="py-3 flex-1">
              <div className="flex gap-4 items-center">
                <p className="text-sm font-medium text-queen-black truncate">
                  {/* {data.receiver_name} */}
                </p>
                <div className="text-xs text-queen-black/60 justify-self-end">
                  {/*{formatDate(data.createdAt)} */}
                </div>
              </div>

              <div className="space-y-1 max-w-[150px]">
                <p className="text-left text-sm text-queen-black/60 truncate">
                  {/** Opportunity name  */}
                </p>
                <p className="text-sm text-queen-black/60 truncate">
                  {room.lastMessage || ""}
                </p>
              </div>
            </div>
          </div>
        </button>
      </li>
    ))}
  </ul>
);

export default ChatList;
