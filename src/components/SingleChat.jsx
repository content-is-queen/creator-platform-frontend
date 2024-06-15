import { useEffect, useState, useRef } from "react";

import { useUser } from "@/context/UserContext";

import {
  collection,
  orderBy,
  onSnapshot,
  query,
  doc,
  limit,
  addDoc,
  updateDoc,
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

const Header = ({ room }) => {
  const { user } = useUser();

  const participant = room.userProfiles.find((i) => i.userId != user.uid);
  return (
    <div className="sticky top-0 flex items-center space-x-4 rtl:space-x-reverse border-solid px-8 py-4 shadow-sm">
      <div>
        <div className="flex-shrink-0">
          <ProfileIcon
            profilePhoto={participant.profilePhoto}
            className="h-12 w-12 flex-shrink-0"
          />
        </div>
      </div>
      <div>
        <span className="text-gray-900 truncate font-subheading font-bold block leading-4">
          {participant.fullName}
        </span>
        <span className="text-sm text-gray-500 truncate block">
          {room.opportunityTitle}
        </span>
      </div>
    </div>
  );
};

const Body = ({ room }) => {
  const { user } = useUser();

  const participant = room.userProfiles.find((i) => i.userId != user.uid);

  const [messages, setMessages] = useState([]);
  const messageBody = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "rooms", room.id, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });
    return () => unsubscribe;
  }, [room]);

  useEffect(() => {
    const isOverflown = (element) => {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    };

    if (isOverflown(messageBody.current))
      messageBody.current.scrollTop = messageBody.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-[80%] overflow-y-auto p-8" ref={messageBody}>
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-8">
          {messages.length > 0 &&
            messages.map((item) => {
              const currentUser = item.uid === user.uid;

              return (
                <div
                  key={item.id}
                  className={clsx(
                    "flex items-center",
                    currentUser && "justify-end"
                  )}
                >
                  {!currentUser && (
                    <ProfileIcon
                      profilePhoto={participant.profilePhoto}
                      className="mr-2"
                    />
                  )}
                  <div
                    className={clsx(
                      "py-3 px-4 text-queen-black",
                      currentUser
                        ? "bg-queen-gray/80 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                        : "bg-queen-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
                    )}
                  >
                    {item.message}
                  </div>
                </div>
              );
            })}
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

    const roomRef = doc(db, "rooms", room.id);

    await updateDoc(roomRef, {
      ...room,
      lastMessage: message,
      senderId: user.uid,
      timeSent: serverTimestamp(),
    });

    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) sendMessage();
  };

  return (
    <div className="relative ">
      <div className="w-full p-8">
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 rounded-full py-2 border border-queen-black/20"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-6 pr-4 items-center inset-y-0 hidden sm:flex">
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
    </div>
  );
};

const SingleChat = ({ room }) => {
  return (
    <div
      className="relative col-span-8 bg-white rounded-3xl shadow-md"
      style={{
        height: "calc(100vh - var(--nav-height) - 54px)",
        maxHeight: "calc(100vh - var(--nav-height) - 54px)",
      }}
    >
      <div className="flex items-stretch flex-col h-[inherit] rounded-t-xl ">
        <Header room={room} />
        <Body room={room} />
        <Footer room={room} />
      </div>
    </div>
  );
};

export default SingleChat;
