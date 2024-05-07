"use client";

import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";

const General = () => {
  const { user } = useUser();

  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="username" value={user?.username}>
          Username
        </Form.Input>

        <Form.Input name="email" value={user?.email}>
          Email
        </Form.Input>

        <Button type="submit" as="button">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default General;
