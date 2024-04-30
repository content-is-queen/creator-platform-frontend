"use client";

import Form from "@/components/Form";
import Button from "@/components/Button";

const General = () => {
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="username">Username</Form.Input>

        <Form.Input name="email">Email</Form.Input>

        <Button type="submit" as="button">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default General;
