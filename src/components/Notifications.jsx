import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { db } from "@/firebase.config";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { IoNotificationsOutline } from "react-icons/io5";
import API from "@/api/api";

import NotificationsList from "./NotificationsList";
import Subheading from "./Subheading";

const Notifications = () => {
  const [notificationList, setNotificationsList] = useState([]);

  const { user } = useUser();
  const { token } = useAuth();

  const handleClearAll = async () => {
    try {
      await API("/notifications/clear", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/notifications`));

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const notifications = [];
        QuerySnapshot.forEach((doc) => {
          notifications.push({ ...doc.data(), id: doc.id });
        });
        setNotificationsList(notifications);
      });
      return () => unsubscribe;
    }
  }, [user]);

  return (
    <Menu as="div" className="relative normal-case text-sm">
      <MenuButton className="flex relative text-sm rounded-full p-1 md:me-0 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-queen-yellow focus-visible:rounded-full">
        <span className="uppercase md:sr-only">Notifications</span>
        {notificationList.length > 0 && (
          <span className="absolute w-2.5 h-2.5 right-0 bg-red-600 rounded-full flex item-center justify-center"></span>
        )}
        <IoNotificationsOutline className="w-6 h-6" />
      </MenuButton>
      <MenuItems anchor="bottom" className="text-queen-black">
        <div className="z-50 mt-3 origin-top-right absolute right-0 bg-white w-72 divide-y divide-queen-black/10 rounded-md shadow-lg">
          <div className="flex justify-between items-center">
            <Subheading className="px-4 py-2 text-sm">Notifications</Subheading>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 hover:text-queen-blue"
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
      </MenuItems>
    </Menu>
  );
};
export default Notifications;
