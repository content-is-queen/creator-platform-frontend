"use client";

import Form from "@/components/Form";
import Button from "@/components/Button";

const EditProfile = () => {
  return (
    <Form className="mx-auto">
      <div className="space-y-10">
        <Form.Input name="first_name">First Name</Form.Input>

        <Form.Input name="last_name">Last Name</Form.Input>

        <Form.Input name="profilePicture" type="file">
          Profile Picture
        </Form.Input>

        <Form.Input name="bio" rows={5}>
          Bio
        </Form.Input>

        <Button type="submit" as="button">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfile;
