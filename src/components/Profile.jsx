"use client";

import ProfileTabs from "@/components/ProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import Button from "@/components/Button";
import ProfileOpportunities from "@/components/ProfileOpportunities";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useUser();

  useEffect(() => {}, [user]);

  return (
    <>
      <ProfileHero user={user}>
        <Button href="/settings/edit-profile" variant="yellow">
          Edit Profile
        </Button>
      </ProfileHero>
      {user?.role === "creator" ? (
        <ProfileTabs />
      ) : (
        <ProfileOpportunities uid={user?.uid} />
      )}
    </>
  );
};

export default Profile;
