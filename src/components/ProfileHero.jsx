"use client";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";

const ProfileHero = ({ user, children }) => {
  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <ProfileIcon photoUrl={user?.imageUrl} className="h-20 w-20" />
        {children}

        <div className="max-w-96">
          <h1 className="font-heading uppercase text-2xl">
            {!user ? (
              <div className="flex flex-col gap-2">
                <div className="bg-queen-white animate-pulse h-2 w-40 rounded"></div>
                <div className="bg-queen-white animate-pulse h-2 w-40 rounded"></div>
              </div>
            ) : (
              `${user?.first_name} ${user?.last_name}`
            )}
          </h1>
          {user?.tags && (
            <div className="flex gap-2 my-2">
              {user?.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <p className="text-sm mt-1">{user?.bio}</p>
        </div>
      </Container>
      <Dots className="absolute -right-48 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
