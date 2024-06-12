"use client";

import { UserProvider } from "@/context/UserContext";
import { useEffect } from "react";

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
    }
  }, []);
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
