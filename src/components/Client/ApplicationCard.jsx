"use client";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import Modal from "@/components/Modal";
import { useState } from "react";
import ProfileIcon from "../ProfileIcon";

const ApplicationCard = ({ application_id, proposal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const user = {
    name: "Kaleshe Alleyne-Vassel",
    skills: ["Editor", "Research", "Marketing"],
  };

  return (
    <Card key={application_id}>
      <div className="mb-8 flex items-center gap-4">
        <Text size="md">{user.name}</Text>
        <div className="flex gap-2">
          {user.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </div>

      <div className="flex gap-2 ml-auto">
        <Button type="button" as="button" variant="white" size="sm">
          Reject
        </Button>
        <Button type="button" as="button" size="sm">
          Accept
        </Button>
        <Button
          type="button"
          as="button"
          variant="blue"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          View
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="flex items-start gap-6">
            <div>
              <ProfileIcon />
            </div>
            {proposal}
          </div>
        </Modal>
      </div>
    </Card>
  );
};

export default ApplicationCard;
