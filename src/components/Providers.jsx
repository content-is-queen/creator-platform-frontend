"use client";

import { UserProvider } from "@/context/UserContext";
import { messaging } from "@/firebase.config";
import { getToken } from "firebase/messaging";
import { useEffect } from "react";

const Providers = ({ children }) => {
 const  VITE_APP_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

useEffect(() => {
  requestPermission();
}, []);
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
