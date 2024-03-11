"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AuthTemplate from "@/components/AuthTemplate";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import Tabs from "@/components/Tabs";

const OPTIONS = [
  {
    label: "Brand",
    id: "brand",
    fields: [
      { name: "email", type: "email", children: "Email Address" },
      { name: "password", type: "password", children: "Password" },
      {
        name: "confirm_password",
        type: "password",
        children: "Confirm Password",
      },
    ],
  },
  {
    label: "Creator",
    id: "creator",
    fields: [
      {
        name: "podcast_name",
        type: "text",
        children: "Podcast Name",
      },
      { name: "email", type: "email", children: "Email Address" },
      { name: "password", type: "password", children: "Password" },
      {
        name: "confirm_password",
        type: "password",
        children: "Confirm Password",
      },
    ],
  },
];

const SignUp = () => {
  const [active, setActive] = useState(OPTIONS[0].id);
  const FIELDS = OPTIONS.find(({ id }) => id === active).fields;

  useEffect(() => {}, [active]);

  return (
    <AuthTemplate>
        <Heading>Sign up</Heading>
        <form>
          <div className="mb-6">
            <Tabs options={OPTIONS} active={active} setActive={setActive} />
          </div>

          <div className="space-y-6">
            {FIELDS.map(({ children, ...otherProps }) => (
              <Input {...otherProps}>{children}</Input>
            ))}
          </div>

          <Button href="/dashboard" className="mt-8">
            Create account
          </Button>
          <Text size="sm" className="mt-4">
            Already registered?{" "}
            <Link href="/login" className="font-medium">
              Login
            </Link>
          </Text>
        </form>
    </AuthTemplate>
  );
};

export default SignUp;
