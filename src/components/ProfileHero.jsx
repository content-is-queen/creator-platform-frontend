"use client";

import { useState } from "react";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";

import useAuth from "@/hooks/useAuth";

const ProfileHero = ({ userInfo, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <ProfileIcon photoUrl={userInfo?.imageUrl} className="h-20 w-20" />
        {children}

        <div className="max-w-96">
          <h1 className="font-heading uppercase text-2xl">
            {`${userInfo?.first_name} ${userInfo?.last_name}`}
          </h1>
          {user.tags != undefined && (
            <div className="flex gap-2 my-2">
              {user?.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <p className="text-sm mt-1">{userInfo?.bio}</p>
        </div>
      </Container>
      <Dots className="absolute -right-48 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
