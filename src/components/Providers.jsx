"use client";

import { useEffect } from "react";
import { UserProvider, useUser } from "@/context/UserContext";
import { messaging } from "@/firebase.config";
import { onMessage } from "firebase/messaging";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {

  async function requestPermission() {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "denied") {
        alert(
          "You denied the notification permission. To enable notifications, please follow these steps:\n\n" +
            "1. Open your browser settings.\n" +
            "2. Navigate to the 'Privacy and security' or 'Site settings' section.\n" +
            "3. Find the 'Notifications' settings.\n" +
            "4. Locate this website and allow notifications."
        );
      } else if (permission === "default") {
        alert(
          "You dismissed the notification permission request. Please refresh the page and allow notifications."
        );
      }
    } else {
      alert(
        "This code is not running in a browser environment or the Notification API is not supported."
      );
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      requestPermission();
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed: ", err);
        });
    } else {
      alert("Service workers are not supported in this environment.");
    }
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);
  //     // toast(<Message notification={payload.notification} />);
  //   });
  }, []);

  return (
    <div>
      <ToastContainer />
      <UserProvider>{children}</UserProvider>
    </div>
  );
};

export default Providers;
