"use client";

import { Suspense, useEffect, useState } from "react";

import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase.config";

import Container from "@/components/Container";
import ChatList from "@/components/ChatList";
import SingleChat from "@/components/SingleChat";
import { useUser } from "@/context/UserContext";

const Empty = ({ rooms }) => (
  <div
    className="relative col-span-8 bg-white px-8 rounded-3xl shadow-md overflow-y-auto flex text-center flex-col items-center justify-center"
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
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "rooms"),
        where("userIds", "array-contains", user.uid)
      );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const rooms = [];
        QuerySnapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id });
        });

        setRooms(rooms);
        setLoading(false);
      });
      return () => unsubscribe;
    }
  }, [user]);

  return (
    <div
      className="bg-dots bg-repeat-x bg-[center_bottom_-4rem]"
      style={{ height: "calc(100vh - var(--nav-height)" }}
    >
      <Container className="pt-8 grid gap-6 grid-cols-12">
        {loading ? (
          <></>
        ) : (
          <>
            <ChatList
              rooms={rooms}
              active={activeChat}
              setActive={setActiveChat}
            />
            {activeChat ? (
              <SingleChat room={activeChat || null} />
            ) : (
              <Empty rooms={rooms} />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Conversations;
