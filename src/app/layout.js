import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tailwindcss-select/dist/index.css";
import { Providers } from "./GrobalRedux/provider";

import localFont from "next/font/local";
import store from "@/redux/store";

const formaDJRDeck = localFont({
  src: "./fonts/FormaDJRDeck-Regular.woff2",
  variable: "--font-forma-deck",
});

const formaDJRBanner = localFont({
  src: [
    { path: "./fonts/FormaDJRBanner-Regular.woff2" },
    { path: "./fonts/FormaDJRBanner-Bold.woff2", weight: "bold" },
  ],
  variable: "--font-forma-banner",
});

export const metadata = {
  title: "Creator Platform | CIQ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`bg-queen-white ${formaDJRBanner.variable} ${formaDJRDeck.variable}`}
    >
      <body>
      <Providers store={store}>
        {children}
      </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
