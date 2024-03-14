import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import Button from "./Button";

const Message = ({ currentUser, children }) => (
  <div className={clsx("flex", currentUser && "justify-end")}>
    {!currentUser && (
      <img
        src="/images/keshe.jpg"
        className="object-cover flex-shrink-0 h-10 w-10 rounded-full"
      />
    )}
    <div
      className={clsx(
        "ml-2 py-3 px-4 text-queen-black",
        !currentUser
          ? "bg-queen-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
          : "bg-queen-gray rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
      )}
    >
      {children}
    </div>
  </div>
);

const Chat = () => {
  return (
    <div
      className="relative col-span-4 bg-white px-8 rounded-3xl shadow-md overflow-y-auto"
      style={{ maxHeight: "calc(100vh - var(--nav-height) - 54px)" }}
    >
      <div className="sticky top-0 pt-8 bg-white flex items-center space-x-4 rtl:space-x-reverse hover:rounded-lg border-solid pb-2">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 flex-shrink-0 lg:w-16 lg:h-16 object-cover rounded-full"
            src="/images/keshe.jpg"
<<<<<<< HEAD
=======
            alt="Kaleshe
            "
>>>>>>> main
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            Kaleshe Alleyne-Vassel
          </p>
          <p className="text-sm text-gray-500 truncate">Email Marketing</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-8 my-12">
          <Message>
            Hey, excited about working with you. Is there anything else I need
            to know?
          </Message>
          <Message currentUser={true}>
            I don’t think so, but I will let you know if anything changes
          </Message>
          <Message>Okay, awesome!</Message>
        </div>
        <div className="bg-gradient-to-t from-white from-40% to-transparent py-8 sticky bottom-0 w-full flex">
          <input
            type="text"
            placeholder="Enter your message"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 rounded-full py-2 border border-queen-black/20"
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
              tag="button"
              type="button"
              className="inline-flex items-center gap-2 h-8 w-8 px-0 justify-center rounded-full"
            >
              <span className="sr-only">Send</span>
              <FontAwesomeIcon
                className="shrink-0 h-4 w-4"
                icon={faPaperPlane}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
