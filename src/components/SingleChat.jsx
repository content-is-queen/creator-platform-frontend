import { useEffect, useState } from "react";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import {
  collection,
  orderBy,
  onSnapshot,
  query,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import Button from "./Button";
import ProfileIcon from "./ProfileIcon";

const Message = ({ children, currentUser }) => {
  return (
    <div className={clsx("flex items-center", !currentUser && "justify-end")}>
      {!currentUser && <ProfileIcon className="h-10 w-10 mr-2 " />}
      <div
        className={clsx(
          "py-3 px-4 text-queen-black",
          !currentUser
            ? "bg-queen-gray rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
            : "bg-queen-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Header = () => (
  <div className="sticky top-0 bg-whiteflex items-center space-x-4 rtl:space-x-reverse hover:rounded-lg border-solid">
    <div>
      <div className="flex-shrink-0">
        <ProfileIcon className="h-12 w-12 flex-shrink-0 lg:w-16 lg:h-16 " />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 truncate">
        {/* {getchatIds.fullName} */}
      </p>
      <p className="text-sm text-gray-500 truncate">{/* Opportunity name */}</p>
    </div>
  </div>
);

const Body = ({ room }) => {
  const { user } = useUser();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", room.id, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-8">
          {messages.length > 0 &&
            messages.map((item) => (
              <Message key={item.id} currentUser={item.uid === user.uid}>
                {item.message}
              </Message>
            ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ room }) => {
  const { user } = useUser();

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    await addDoc(collection(db, "rooms", room.id, "messages"), {
      message: message,
      uid: user.uid,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="bg-gradient-to-t from-white from-40% to-transparent bottom-0 w-full flex relative mt-auto">
      <input
        type="text"
        placeholder="Enter your message"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 rounded-full py-2 border border-queen-black/20"
        value={message}
        onChange={handleChange}
      />
      <div className="absolute right-0 pr-4 items-center inset-y-0 hidden sm:flex">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-queen-black hover:opacity-80 focus:outline-none"
        >
          <FontAwesomeIcon className="h-6 w-6" icon={faImage} />
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-queen-black hover:opacity-80 focus:outline-none"
        >
          <FontAwesomeIcon className="h-6 w-6" icon={faPaperclip} />
        </button>
        <Button
          as="button"
          type="button"
          onClick={sendMessage}
          className="inline-flex items-center gap-2 h-8 w-8 px-0 justify-center rounded-full"
        >
          <span className="sr-only">Send</span>
          <FontAwesomeIcon className="shrink-0 h-4 w-4" icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};

const SingleChat = ({ room }) => {
  return (
    <div
      className="relative col-span-4 bg-white rounded-3xl shadow-md"
      style={{
        height: "calc(100vh - var(--nav-height) - 54px)",
        maxHeight: "calc(100vh - var(--nav-height) - 54px)",
      }}
    >
      <div className="flex items-stretch flex-col h-[inherit]">
        <Header />
        <Body room={room} />
        <Footer room={room} />
      </div>
    </div>
  );
};

export default SingleChat;
