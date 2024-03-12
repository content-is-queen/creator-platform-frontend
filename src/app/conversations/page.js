"use client";

import { useState } from "react";

import MainNav from "@/components/MainNav";
import ConversationPreview from "@/components/ConversationPreview";
import Chat from "@/components/Chat";
import Container from "@/components/Container";

const CONVERSATIONS = [1, 2, 3, 4];

const Conversations = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-queen-white message h-screen bg-dots bg-repeat-x bg-[center_bottom_-4rem]">
      <MainNav />
      <Container className="my-8 grid gap-6 grid-cols-6">
        <ul
          className="bg-white rounded-3xl shadow-md col-span-2 overflow-y-auto"
          style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
        >
          {CONVERSATIONS?.map((user, index) => (
            <ConversationPreview
              active={active}
              index={index}
              setActive={setActive}
              key={user}
            />
          ))}
        </ul>

        <Chat />
      </Container>
    </div>
  );
};

export default Conversations;
