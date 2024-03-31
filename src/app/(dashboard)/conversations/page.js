"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc, onSnapshot, getDoc  } from "firebase/firestore";
import Select from "react-tailwindcss-select";
import ConversationPreview from "@/components/ConversationPreview";
import Chat from "@/components/Chat";
import Container from "@/components/Container";
import API from "@/api/api";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase";
import isAuth from "@/helpers/isAuth";


const Conversations = () => {
  const [active, setActive] = useState(null);
  const [userList, setUserList] = useState([]);
  const [senderReceiverId, setsSenderReceiverId] = useState({});
  const [options, setOptions] = useState([]);
  const [animal, setAnimal] = useState(null);
  const [roomsList, setRoomsList] = useState([]);

  const fetchUserUsersList = async () => {
    try {
      const response = await API.get("messages/users");
      if (response && response.data && response.data.message) {
      const formattedOptions = response.data.message.map(item => {
          if (item && item.firstName) {
            return {
              label: item.firstName,
              value: item,
            };
            }
            });
            const filteredOptions = formattedOptions.filter(option => option !== undefined);
              setOptions(filteredOptions);
            } else {
            console.error("Error: Response or data.message is undefined");
            }
        // setOptions(filteredOptions);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
  };



  const handeGetIds = (ids) => {
    setsSenderReceiverId(ids);
  };

  const fetchLoomsList = async () =>{
    const roomsListAray = [];
    const querySnapshot = await getDocs(collection(db, 'rooms'));
    querySnapshot.forEach((doc) => {
       roomsListAray.push(doc.data())
    });
    setRoomsList(roomsListAray);
  }


  const handleChange = async(data) => {
    setAnimal(data);
    try{
    if(data !== null){
      const {value} = data;
      const user = isAuth();
      const senderDocPath = `users/${user.role}/users/${user.user_id}`;
      const senderDocRef = doc(db, senderDocPath);
      const senderDocSnapshot = await getDoc(senderDocRef);

      const usersCollectionRef = collection(db, 'users');
      const usersQuerySnapshot = await getDocs(usersCollectionRef);
      usersQuerySnapshot.forEach(async (userDoc) => {
        const userId = userDoc.id;
        const nestedDocPath = `users/${userId}/users/${value.uid}`;
        const nestedDocRef = doc(db, nestedDocPath);
        const nestedDocSnapshot = await getDoc(nestedDocRef);
        if (nestedDocSnapshot.exists()) {
          const nestedDocData = nestedDocSnapshot.data();
          console.log("sender DAta ......", nestedDocData );
          console.log(senderDocSnapshot.data(), "Curent users data >>>>>>>>>>>" )
          const ids = [user.user_id, value.uid];
          ids.sort();
          const combinedIds = ids.join('_');
          const roomsRef = doc(db,"rooms", combinedIds);
         await setDoc(roomsRef, {
            createdAt: new Date().toString(),
            sender: user.user_id,
            sender_name: senderDocSnapshot.data().firstName,
            sender_image_url:senderDocSnapshot.data().imageUrl,
            receiver_name: nestedDocData.firstName,
            receiver_image_url:nestedDocData.imageUrl,
            receiver: value.uid,
          } , { merge: true });
      } else {
          toast.error("Nested document does not exist.");
      }

      });
    }
  }catch(error){
    console.log(error, "Current error ......");
  }
};

useEffect(() => {
  fetchUserUsersList();
  fetchLoomsList();
  const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
    const updatedRoomsList = [];
    snapshot.forEach((doc) => {
      updatedRoomsList.push({ id: doc.id, ...doc.data() });
    });
    setRoomsList(updatedRoomsList);
  });

  return () => {
    unsubscribe();
  };
}, []);
console.log(roomsList, "Rooooooms lllisststlllllll");
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
            <li className="p-8 pb-4">  <Select
            value={animal}
            onChange={handleChange}
            options={options}
            isSearchable={true}
            isClearable={true}
        /></li>
       {roomsList?.length > 0 && roomsList?.map((user, index) => {
           return <ConversationPreview
           active={active}
           index={index}
           data={user}
           setActive={setActive}
           key={user.uid}
           getIds={handeGetIds}
         />
        })}
        </ul>

        {Object.keys(senderReceiverId).length > 0 && (
                <Chat getchatIds={senderReceiverId} />
        )}
      </Container>
    </div>
  );
};

export default Conversations;
