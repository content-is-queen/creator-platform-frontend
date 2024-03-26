"use client";

import { useEffect, useState } from "react";

import ConversationPreview from "@/components/ConversationPreview";
import Chat from "@/components/Chat";
import Container from "@/components/Container";
import API from "@/api/api";

const CONVERSATIONS = [1, 2, 3, 4];

const Conversations = () => {
  const [active, setActive] = useState(null);
  const [userList, setUserList] = useState([]);
  const [senderReceiverId, setsSenderReceiverId] = useState({});

  const fetchUserUsersList = async () => {
    try {
      const response = await API.get("messages/users");
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handeGetIds = (ids) => {
    setsSenderReceiverId(ids);
  };

  useEffect(() => {
    fetchUserUsersList();
  }, []);

  return (
    <div
      className="bg-dots bg-repeat-x bg-[center_bottom_-4rem]"
      style={{ height: "calc(100vh - var(--nav-height)" }}
    >
      <Container className="my-8 grid gap-6 grid-cols-6">
        <ul
          className="bg-white rounded-3xl shadow-md col-span-2 overflow-y-auto"
          style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
        >
          {userList?.map((user, index) => (
            <ConversationPreview
              active={active}
              index={index}
              data={user}
              setActive={setActive}
              key={user.uid}
              getIds={handeGetIds}
            />
          ))}
        </ul>

        <Chat getchatIds={senderReceiverId} />
      </Container>
    </div>
  );
};

export default Conversations;
