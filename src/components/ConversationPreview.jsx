"use client";

import API from "@/api/api";
import formatDate from "@/helpers/dateFormatter";
import clsx from "clsx";
import { useEffect, useState } from "react";

const ConversationPreview = ({ active, setActive, index, data, getIds }) => {
  const [messageList, setMessageList] = useState([]);
  const clickHandler = () => {
    getIds({
      sender: user_id,
      receiver: data.receiver,
      id: data.id,
      fullName: data.receiver_name,
      profile_image: data.receiver_image_url,
    });
    setActive(index);
  };

  const fetchUserMessageList = async () => {
    try {
      const response = await API("messages/users");
      setMessageList(response.data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    fetchUserMessageList();
  }, []);
  return (
    <li className="first:rounded-t-3xl overflow-hidden">
      <button type="button" className="w-full" onClick={clickHandler}>
        <div
          className={clsx(
            "flex items-center gap-x-4 px-6 py-1 hover:bg-queen-gray/80 border-t-0 border-b last:border-b-0 border-gray-200 border-solid",
            active === index && "bg-queen-gray/40"
          )}
        >
          <div className="shrink-0">
            <img
              alt=""
              className="w-14 h-14 rounded-full object-cover"
              src={
                data.sender === user_id
                  ? data.receiver_image_url
                  : data.sender_image_url
              }
            />
          </div>

          <div className="py-3 flex-1">
            <div className="flex gap-4 items-center">
              <p className="text-sm font-medium text-queen-black truncate">
                {data.receiver_name}
              </p>
              <div className="text-xs text-queen-black/60 justify-self-end">
                {formatDate(data.createdAt)}
              </div>
            </div>

            <div className="space-y-1 max-w-[150px]">
              <p className="text-left text-sm text-queen-black/60 truncate">
                Email Marketing
              </p>
              <p className="text-sm text-queen-black/60 truncate">
                {data.lastMessage || "No message"}
              </p>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export default ConversationPreview;
