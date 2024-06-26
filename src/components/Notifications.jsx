import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import { Menu } from "@headlessui/react";
import { auth, db } from "@/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { IoNotificationsOutline } from "react-icons/io5";
import API from "@/api/api";

import NotificationsList from "./NotificationsList";
import Subheading from "./Subheading";

const Notifications = () => {
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [notificationList, setNotificationsList] = useState([]);
  const [isNewNotification, setIsNewNotification] = useState(false);

  const { user } = useUser();
  const { token } = useAuth();

  const handleIsBellClicked = async () => {
    setIsNewNotification(false);
    if (!user) return;
    if (isBellClicked === false) {
      if (token) {
        try {
          const response = await API("/notifications/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = response.data;
          setNotificationsList(data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    }
    setIsBellClicked((prev) => !prev);
  };

  const handleClearAll = async () => {
    try {
      await API("/notifications/clear", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsBellClicked(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, `users/${user.uid}/notifications`);
    const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
      if (!snapshot.empty) {
        setIsNewNotification(true);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Menu as="div" className="relative normal-case">
      <Menu.Button
        className="flex relative text-sm rounded-full md:me-0 focus:ring-4"
        onClick={handleIsBellClicked}
      >
        <span className="uppercase md:sr-only">Notifications</span>
        {isNewNotification && (
          <span className="absolute w-2.5 h-2.5 right-0 bg-red-600 rounded-full flex item-center justify-center"></span>
        )}
        <IoNotificationsOutline className="w-6 h-6" />
      </Menu.Button>
      <Menu.Items anchor="bottom" className="text-queen-black">
        <div className="z-50 mt-3 origin-top-right absolute right-0 bg-white w-60 divide-y divide-gray-100 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <Subheading className="px-4 py-2 text-sm">Notifications</Subheading>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 text-sm hover:text-queen-blue"
            >
              Clear
            </button>
          </div>
          {notificationList.length > 0 ? (
            notificationList.map((item) => (
              <NotificationsList key={item.id} data={item} />
            ))
          ) : (
            <div className="block px-2 py-6 font-medium text-center text-queen-black/60">
              You have no notifications
            </div>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};
export default Notifications;
