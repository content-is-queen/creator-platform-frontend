"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import Container from "@/components/Container";
import ChatList from "@/components/ChatList";
import SingleChat from "@/components/SingleChat";
import { useUser } from "@/context/UserContext";

const Empty = ({ rooms }) => (
  <div
    className="relative col-span-4 bg-white px-8 rounded-3xl shadow-md overflow-y-auto flex text-center flex-col items-center justify-center"
    style={{ maxHeight: "calc(100vh - var(--nav-height) - 54px)" }}
  >
    <div className="max-w-sm">
      <p className="text-subheading text-queen-black font-bold text-lg mb-2">
        {rooms.length > 0 ? "Get chatting" : "Nothing to see here!"}
      </p>
      <p className="text-queen-black/80">
        {" "}
        {rooms.length > 0
          ? "Select one of the chats in the sidebar to get the ball rolling"
          : "You currently have no conversations"}
      </p>
    </div>
  </div>
);

const Conversations = () => {
  const { user } = useUser();

  const [activeChat, setActiveChat] = useState(null);
  const [rooms, setRooms] = useState([]);

  const getRooms = async (id) => {
    try {
      const { data } = await API.get(`/messages/user-rooms/${id}`);
      setRooms(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (user) {
      getRooms(user.uid);
    }
  }, [user]);

  return (
    <div
      className="bg-dots bg-repeat-x bg-[center_bottom_-4rem]"
      style={{ height: "calc(100vh - var(--nav-height)" }}
    >
      <Container className="pt-8 grid gap-6 grid-cols-6">
        <ChatList rooms={rooms} active={activeChat} setActive={setActiveChat} />
        {activeChat ? (
          <SingleChat room={activeChat || null} />
        ) : (
          <Empty rooms={rooms} />
        )}{" "}
      </Container>
    </div>
  );
};

export default Conversations;
