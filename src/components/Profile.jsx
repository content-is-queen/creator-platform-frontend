"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

import CreatorProfileTabs from "@/components/Creator/CreatorProfileTabs/CreatorProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import Button from "@/components/Button";
import BrandProfileOpportunities from "@/components/Brand/BrandProfileOpportunities";

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
        <CreatorProfileTabs />
      ) : (
        <BrandProfileOpportunities uid={user?.uid} />
      )}
    </>
  );
};

export default Profile;
