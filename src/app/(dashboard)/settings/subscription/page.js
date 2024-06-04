"use client";

import Form from "@/components/Form";
import Button from "@/components/Button";

const Subscription = () => {
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="payment_method">Cancel subscription</Form.Input>

        <Button type="submit" as="button">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default Subscription;
