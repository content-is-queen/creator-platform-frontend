"use client";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Password = () => {
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="old_password" type="password">
          Old Password
        </Form.Input>

        <Form.Input name="password" type="password">
          Password
        </Form.Input>

        <Button type="submit" as="button">
          Update Password
        </Button>
      </div>
    </Form>
  );
};

export default Password;
