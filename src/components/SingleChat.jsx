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
import { db, storage } from "@/firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faFile,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Button from "./Button";
import ProfileIcon from "./ProfileIcon";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "./Modal";

const Message = ({ children, currentUser }) => {
  return (
    <div className={clsx("flex items-center", currentUser && "justify-end")}>
      {!currentUser && <ProfileIcon className="mr-2" />}
      <div
        className={clsx(
          "py-3 px-4 text-queen-black",
          currentUser
            ? "bg-queen-gray/80 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
            : "bg-queen-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
        )}
      >
        {children}
      </div>
    </div>
  );
};

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
  const [messages, setMessages] = useState([]);
  const messageBody = useRef();
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
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    const isOverflown = (element) => {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    };

    if (isOverflown(messageBody.current))
      if (messageBody.current)
        messageBody.current.scrollTop = messageBody.current.scrollHeight;
  }, [messages]);

  return (
    <div className="h-[80%] overflow-y-auto p-8" ref={messageBody}>
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col space-y-8">
          {messages.length > 0 &&
            messages.map((item) => {
              return (
                <Message key={item.id} currentUser={item.uid === user.uid}>
                  {item.message ? (
                    item.message
                  ) : (
                    <div>
                      {item?.image && (
                        <a href={item.image} target="_blank" rel="Image">
                          <img
                            src={item.image}
                            className="max-h-44 !cursor-pointer"
                            alt="file preview"
                          />
                        </a>
                      )}
                      {item?.file && (
                        <a href={item.file}>
                          <FontAwesomeIcon icon={faFile} className="h-20" />
                          <span className="block text-sm mt-2">
                            Download {item.file.name}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </Message>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extenstion, setExtension] = useState("");
  const imageExtensions = ["svg", "jpg", "jpeg", "png", "gif", ".bmp", ".tif"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    setExtension(fileExtension);
    setUploadedFile(file);
  };

  const sendMessage = async () => {
    if (message.trim() === "" && !uploadedFile) {
      return;
    }

    const messageData = {
      uid: user.uid,
      createdAt: serverTimestamp(),
    };

    if (message) {
      messageData.message = message;
    }

    if (uploadedFile) {
      setLoading(true);
      if (extenstion) {
        const storageRef = ref(storage, `messagefiles/${uploadedFile.name}`);
        try {
          await uploadBytes(storageRef, uploadedFile);
          const downloadURL = await getDownloadURL(storageRef);
          if (imageExtensions.includes(extenstion)) {
            messageData.image = downloadURL;
          } else {
            messageData.file = downloadURL;
          }
          setLoading(false);
          setUploadedFile(null);
          setExtension("");
          setIsModalOpen(false);
        } catch (error) {
          console.error("Error uploading file: ", error);
        }
      }
    }

    await addDoc(collection(db, "rooms", room.id, "messages"), messageData);

    const roomRef = doc(db, "rooms", room.id);

    await updateDoc(roomRef, {
      ...room,
      lastMessage: message || "File sent",
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
    <div className="relative">
      <Modal
        open={isModalOpen}
        onClose={() => {
          setUploadedFile(null);
          setIsModalOpen(false);
        }}
        className="max-w-xl"
      >
        <div data-upload-id="my-unique-id" className="text-center">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="dropzone">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
                <svg
                  className="w-8 h-8 mb-4 text-queen-black/80"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-queen-black/80">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-queen-black/80">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="!hidden"
                onChange={handleFileChange}
              />
              {uploadedFile && (
                <div className="mb-8">
                  <p className="text-sm">{uploadedFile.name}</p>
                </div>
              )}
            </label>
          </div>

          {uploadedFile && (
            <div className="flex gap-1 justify-center">
              <Button type="button" as="button" onClick={sendMessage}>
                {loading && <Button.Spinner />}
                Send
              </Button>
            </div>
          )}
        </div>
      </Modal>

      <div className="w-full p-8">
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 rounded-full py-2 border border-queen-black/20"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="absolute right-6 pr-4 items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-queen-black hover:opacity-80 focus:outline-none"
            onClick={() => setIsModalOpen(!isModalOpen)}
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
