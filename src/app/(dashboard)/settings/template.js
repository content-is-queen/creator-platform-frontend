"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "@/components/Container";
import Text from "@/components/Text";

const LINKS = [
  {
    href: "/settings",
    label: "General",
  },
  {
    href: "/settings/edit-profile",
    label: "Edit Profile",
  },
  {
    href: "/settings/password",
    label: "Password",
  },
];

const Template = ({ children }) => {
  const pathname = usePathname();

  return (
    <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="border-b border-queen-black/20 w-full max-w-40 pb-12">
            <Text size="lg" className="font-subheading font-bold mb-2">
              Settings
            </Text>
            <ul>
              {/* {LINKS.map(() => (
                <li>
                  <Link href={li}></Link>
                </li>
              ))} */}
              <li className="py-1 text-queen-black/80">
                <Link href="/settings">General</Link>
              </li>
              <li className="py-1 text-queen-black/80">
                <Link href="/settings/edit-profile">Edit Profile</Link>
              </li>
              <li className="py-1 text-queen-black/80">
                <Link href="/settings/password">Password</Link>
              </li>
            </ul>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default Template;
