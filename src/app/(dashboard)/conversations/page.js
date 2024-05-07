"use client";

import { useState } from "react";
import Select from "react-tailwindcss-select";
import ConversationPreview from "@/components/ConversationPreview";
import Chat from "@/components/Chat";
import Container from "@/components/Container";

const Empty = () => (
  <div
    className="relative col-span-4 bg-white px-8 rounded-3xl shadow-md overflow-y-auto flex text-center flex-col items-center justify-center"
    style={{ maxHeight: "calc(100vh - var(--nav-height) - 54px)" }}
  >
    <div className="max-w-sm">
      <p className="text-subheading text-queen-black font-bold text-lg mb-2">
        Nothing to see here
      </p>
      <p className="text-queen-black/80">
        You currently have no conversations. A conversation is created once you
        accept an open application.
      </p>
    </div>
  </div>
);

const Conversations = () => {
  const [active, setActive] = useState(null);

  return (
    <div
      className="bg-dots bg-repeat-x bg-[center_bottom_-4rem]"
      style={{ height: "calc(100vh - var(--nav-height)" }}
    >
      <Container className="pt-8 grid gap-6 grid-cols-6">
        <ul
          className="bg-white rounded-3xl shadow-md col-span-2 overflow-y-auto"
          style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
        >
          <li className="p-8 pb-4">
            <Select isSearchable={true} isClearable={true} />
          </li>
          {/*
              <ConversationPreview
                active={active}
                setActive={setActive}
              /> */}
        </ul>

        {false ? <Chat /> : <Empty />}
      </Container>
    </div>
  );
};

export default Conversations;
