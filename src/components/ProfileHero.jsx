"use client";

import { usePathname } from "next/navigation";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Heading from "@/components/Heading";


const ProfileHero = ({ user }) => {
  const pathname = usePathname();

  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <ProfileIcon imageUrl={user?.imageUrl} className="h-20 w-20" />
        {pathname === "/profile" && (
          <Button href="/settings/edit-profile" variant="yellow">
            Edit Profile
          </Button>
        )}

        <div className="max-w-96">
        <Heading color="lilac" size="3xl">
            {!user ? (
              <LoadingPlaceholder />
            ) : (
              `${user?.first_name} ${user?.last_name}`
            )}
          </Heading>
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
