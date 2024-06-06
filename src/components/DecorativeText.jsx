import clsx from "clsx";
import localFont from "next/font/local";

const swearDisplay = localFont({
  src: "../app/fonts/SwearDisplay-MediumCilati.woff2",
  variable: "--font-swear-display",
});

const DecorativeText = ({ className, children }) => (
  <p className={clsx(`${swearDisplay.variable} font-decorative`, className)}>
    {children}
  </p>
);

export default DecorativeText;
