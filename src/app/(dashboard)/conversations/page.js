"use client";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import Select from "react-tailwindcss-select";
import ConversationPreview from "@/components/ConversationPreview";
import Chat from "@/components/Chat";
import Container from "@/components/Container";
import API from "@/api/api";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase";
import isAuth from "@/helpers/isAuth";
import Text from "@/components/Text";

const Empty = () => (
  <div
    className="relative col-span-4 bg-white px-8 rounded-3xl shadow-md overflow-y-auto flex text-center flex-col items-center justify-center"
    style={{ maxHeight: "calc(100vh - var(--nav-height) - 54px)" }}
  >
    <div className="max-w-sm">
      <p className="text-subheading text-xl mb-2">Nothing to see here</p>
      <p className="text-queen-black/80">
        You currently have no conversations. A conversation is created once you
        accept an open application.
      </p>
    </div>
  </div>
);

const Conversations = () => {
  const [active, setActive] = useState(null);
  const [options, setOptions] = useState([]);
  const [animal, setAnimal] = useState(null);
  const [roomsList, setRoomsList] = useState([]);
  const [senderReceiverId, setsSenderReceiverId] = useState({});

  const fetchUserUsersList = async () => {
    try {
      const response = await API.get("messages/users");
      if (response && response.data && response.data.message) {
        const formattedOptions = response.data.message
          .filter((item) => item && item.firstName)
          .map((item) => ({
            label: item.firstName,
            value: item,
          }));
        setOptions(formattedOptions);
      } else {
        console.error("Error: Response or data.message is undefined");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handeGetIds = (ids) => {
    setsSenderReceiverId(ids);
  };

  const fetchLoomsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsListArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoomsList(roomsListArray);
    } catch (error) {
      console.error("Error fetching rooms list:", error);
    }
  };

  const handleChange = async (data) => {
    setAnimal(data);
    // const user_id = isAuth();
    try {
      if (data !== null) {
        const { value } = data;
        if (!value) {
          console.error("Error: 'value' is null or undefined.");
          return;
        }

        const user = isAuth();
        const senderDocPath = `users/${user.role}/users/${user.user_id}`;
        const senderDocRef = doc(db, senderDocPath);
        const senderDocSnapshot = await getDoc(senderDocRef);

        if (!senderDocSnapshot.exists()) {
          console.error("Error: Sender document does not exist.");
          return;
        }

        const usersCollectionRef = collection(db, "users");
        const usersQuerySnapshot = await getDocs(usersCollectionRef);
        usersQuerySnapshot.forEach(async (userDoc) => {
          const userId = userDoc.id;
          const nestedDocPath = `users/${userId}/users/${value.uid}`;
          const nestedDocRef = doc(db, nestedDocPath);
          const nestedDocSnapshot = await getDoc(nestedDocRef);

          if (nestedDocSnapshot.exists()) {
            const nestedDocData = nestedDocSnapshot.data();

            // Check if all required data is valid
            if (
              new Date().toString() &&
              user.user_id &&
              senderDocSnapshot.data()?.firstName &&
              senderDocSnapshot.data()?.imageUrl &&
              nestedDocData?.firstName &&
              nestedDocData?.imageUrl &&
              value.uid
            ) {
              const ids = [user.user_id, value.uid];
              ids.sort();
              const combinedIds = ids.join("_");
              const roomsRef = doc(db, "rooms", combinedIds);
              await setDoc(
                roomsRef,
                {
                  createdAt: new Date().toString(),
                  sender: user.user_id,
                  sender_name: senderDocSnapshot.data().firstName,
                  sender_image_url: senderDocSnapshot.data().imageUrl,
                  receiver_name: nestedDocData.firstName,
                  receiver_image_url: nestedDocData.imageUrl,
                  receiver: value.uid,
                },
                { merge: true }
              );
            } else {
              toast.error("Invalid data for setDoc.");
            }
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserUsersList();
    fetchLoomsList();
    const { user_id } = isAuth();
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const updatedRoomsList = snapshot.docs
        .filter(
          (doc) =>
            doc.data().receiver === user_id || doc.data().sender === user_id
        )
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setRoomsList(updatedRoomsList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(roomsList, "Rooms list:");

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
            <Select
              value={animal}
              onChange={handleChange}
              options={options}
              isSearchable={true}
              isClearable={true}
            />
          </li>
          {roomsList?.length > 0 &&
            roomsList?.map((user, index) => (
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

        {Object.keys(senderReceiverId).length > 0 ? (
          <Chat getchatIds={senderReceiverId} />
        ) : (
          <Empty />
        )}
      </Container>
    </div>
  );
};

export default Conversations;
